"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useFetchData } from "../HOC/UseFetchData"
import { useCRUD } from "../HOC/UseCRUD"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import "./staffschedule.scss"

export default function Staff({ dateRange }) {


  
  const [staffData, setStaffData] = useState({})
  const [operationTypes, setOperationTypes] = useState({})
  const [operationDetails, setOperationDetails] = useState({})
  const [siteNames, setSiteNames] = useState({})
  const [calendarDays, setCalendarDays] = useState([])
  const [filteredOperations, setFilteredOperations] = useState([])

  // Get the current view and date range from props or use defaults
  const currentView = dateRange?.view || "month"
  const startDate = dateRange?.startDate || dayjs().startOf("month")
  const endDate = dateRange?.endDate || dayjs().endOf("month")

  const { handleDelete, refetch, deleteStatus } = useCRUD()
  const {
    data: siteOperations,
    loading,
    error,
    refetch: refetchOperations,
  } = useFetchData(`http://localhost:8383/siteoperationstaffvehicle/list`, deleteStatus)

  const navigate = useNavigate()
  const accessToken = localStorage.getItem("accessToken")

  // Redirect if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    } else {
      refetchOperations()
    }
  }, [accessToken, navigate, refetchOperations])

  // Filter operations based on date range
  useEffect(() => {
    if (!siteOperations?.length) return

    // Filter operations that fall within the selected date range
    const filtered = siteOperations.filter((operation) => {
      const operationDetail = operationDetails[operation.siteoperationtypesId] || {}

      // Skip if no operation details
      if (!operationDetail.startDate || !operationDetail.endDate) return false

      const opStartDate = dayjs(operationDetail.startDate)
      const opEndDate = dayjs(operationDetail.endDate)

      // Check if operation overlaps with selected date range
      return (
        (opStartDate.isBefore(endDate) || opStartDate.isSame(endDate, "day")) &&
        (opEndDate.isAfter(startDate) || opEndDate.isSame(startDate, "day"))
      )
    })

    setFilteredOperations(filtered)
  }, [siteOperations, operationDetails, startDate, endDate])

  // Fetch Staff Details & Operation Type Name
  useEffect(() => {
    const fetchStaffDetails = async () => {
      if (!siteOperations?.length) return

      const uniqueSiteOperationsIds = [...new Set(siteOperations.map((item) => item.siteoperationtypesId))]

      try {
        const operationsData = await Promise.all(
          uniqueSiteOperationsIds.map(async (siteoperationtypesId) => {
            try {
              const response = await axios.get(`http://localhost:8383/siteoperation/getbyid/${siteoperationtypesId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              })

              return {
                siteoperationtypesId,
                operationtypesId: response.data.operationtypesId,
                startDate: response.data.startDate,
                endDate: response.data.endDate,
                siteId: response.data.siteId,
              }
            } catch (error) {
              console.error(`Error fetching site operation ${siteoperationtypesId}:`, error.response?.data || error)
              return {
                siteoperationtypesId,
                operationtypesId: "Unknown",
                startDate: "N/A",
                endDate: "N/A",
                siteId: null,
              }
            }
          }),
        )

        // Store operation details
        const operationDetailsMap = {}
        const uniqueSiteIds = []

        operationsData.forEach(({ siteoperationtypesId, startDate, endDate, siteId, operationtypesId }) => {
          operationDetailsMap[siteoperationtypesId] = {
            startDate,
            endDate,
            siteId,
            operationtypesId,
          }

          if (siteId && !uniqueSiteIds.includes(siteId)) {
            uniqueSiteIds.push(siteId)
          }
        })

        setOperationDetails(operationDetailsMap)

        // Fetch operation type names
        const uniqueOperationTypeIds = [
          ...new Set(operationsData.map((op) => op.operationtypesId).filter((id) => id !== "Unknown")),
        ]

        const operationTypeDetails = await Promise.all(
          uniqueOperationTypeIds.map(async (operationtypesId) => {
            try {
              const response = await axios.get(`http://localhost:8383/operationtypes/getbyid/${operationtypesId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              })
              return { operationtypesId, name: response.data.name, color: response.data.color }
            } catch (error) {
              console.error(`Error fetching operation type ${operationtypesId}:`, error.response?.data || error)
              return { operationtypesId, name: "Unknown Operation Type" }
            }
          }),
        )

        // Fetch site names
        if (uniqueSiteIds.length > 0) {
          const siteDetails = await Promise.all(
            uniqueSiteIds.map(async (siteId) => {
              try {
                const response = await axios.get(`http://localhost:8383/site/getbyid/${siteId}`, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                })

                return {
                  siteId,
                  name: response.data.name,
                  startDate: response.data.startDate,
                  endDate: response.data.endDate,
                }
              } catch (error) {
                console.error(`Error fetching Site ${siteId}:`, error.response?.data || error)
                return { siteId, name: "Unknown Site" }
              }
            }),
          )

          // Store site names
          const siteNamesMap = {}
          siteDetails.forEach(({ siteId, name, startDate, endDate }) => {
            siteNamesMap[siteId] = { name, startDate, endDate }
          })

          setSiteNames(siteNamesMap)
        }

        // Store operation type names
        const operationTypeMap = {}
        operationTypeDetails.forEach(({ operationtypesId, name, color }) => {
          operationTypeMap[operationtypesId] = { name, color }
        })

        setOperationTypes(operationTypeMap)
      } catch (err) {
        console.error("Error fetching operation details:", err)
      }
    }

    const fetchStaffSchedule = async () => {
      if (!siteOperations?.length) return

      const uniqueStaffIds = [...new Set(siteOperations.map((item) => item.staffId))]

      try {
        const staffData = await Promise.all(
          uniqueStaffIds.map(async (staffId) => {
            try {
              const response = await axios.get(`http://localhost:8383/staff/getbyid/${staffId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              })
              return {
                staffId,
                name: response.data.name,
                position: response.data.position,
                image: response.data.image || "fallback-image.jpg",
              }
            } catch (error) {
              console.error(`Error fetching staff ${staffId}:`, error.response?.data || error)
              return { staffId, name: "Unknown Staff", position: "No Position", image: "fallback-image.jpg" }
            }
          }),
        )

        // Store staff details
        const staffMap = {}
        staffData.forEach(({ staffId, name, position, image }) => {
          staffMap[staffId] = { name, position, image }
        })

        setStaffData(staffMap)
      } catch (err) {
        console.error("Error fetching staff details:", err)
      }
    }

    fetchStaffDetails()
    fetchStaffSchedule()
  }, [siteOperations, accessToken])

  // Generate calendar days based on current view and date range
  useEffect(() => {
    const daysArray = []
    let currentDay = startDate.clone()

    // Generate days until we reach the end date
    while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, "day")) {
      daysArray.push({
        date: currentDay,
        dayOfMonth: currentDay.date(),
        weekday: currentDay.format("dd"),
        isToday: currentDay.isSame(dayjs(), "day"),
      })
      currentDay = currentDay.add(1, "day")
    }

    setCalendarDays(daysArray)
  }, [startDate, endDate, currentView])

  // Helper function to determine if a date falls within an operation's date range
  const isDateInRange = (date, startDate, endDate) => {
    if (!startDate || !endDate || startDate === "N/A" || endDate === "N/A") return false

    const checkDate = dayjs(date)
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    return (
      (checkDate.isAfter(start) || checkDate.isSame(start, "day")) &&
      (checkDate.isBefore(end) || checkDate.isSame(end, "day"))
    )
  }

  const getSiteColor = (siteName) => {
    if (!siteName) return "#ff7b04"
    return "#ff7b04" // Default orange color
  }

  const getOperationtypesColor = (operationtypesId) => {
    return operationTypes[operationtypesId]?.color || "gray"
  }

  // Get display name for the operation
  const getOperationDisplayName = (operation) => {
    const operationDetail = operationDetails[operation.siteoperationtypesId] || {}
    const siteId = operationDetail.siteId
    const operationtypesId = operationDetail.operationtypesId

    const siteName = siteNames[siteId]?.name || "Unknown Site"
    const operationTypeName = operationTypes[operationtypesId]?.name || "Unknown Operation"

    return { siteName, operationTypeName, operationtypesId }
  }

  // Calculate grid column positions based on the current view and date range
  const calculateGridPosition = (date, view) => {
    if (!date || !date.isValid()) return null

    if (view === "month") {
      // For month view, use the day of month
      return date.date()
    } else if (view === "week") {
      // For week view, use the day of week (0-6) + 1
      return date.day() + 1
    }
    return null
  }

  return (
    <div className="staff-schedule-container">
      {/* Staff Schedule */}
      <div className="staff-schedule-content">
        {loading && <p className="loading-message">Loading staff schedule...</p>}
        {error && <p className="error-message">Error fetching data</p>}

        {!loading && !error && siteOperations?.length > 0
          ? // Group operations by staff
            Object.entries(
              siteOperations.reduce((acc, operation) => {
                if (!acc[operation.staffId]) {
                  acc[operation.staffId] = []
                }
                acc[operation.staffId].push(operation)
                return acc
              }, {}),
            ).map(([staffId, operations]) => {
              const staff = staffData[staffId] || {}

              // Filter operations for this staff that fall within the date range
              const staffOperations = operations.filter((operation) => {
                const operationDetail = operationDetails[operation.siteoperationtypesId] || {}
                if (!operationDetail.startDate || !operationDetail.endDate) return false

                const opStartDate = dayjs(operationDetail.startDate)
                const opEndDate = dayjs(operationDetail.endDate)

                return (
                  (opStartDate.isBefore(endDate) || opStartDate.isSame(endDate, "day")) &&
                  (opEndDate.isAfter(startDate) || opEndDate.isSame(startDate, "day"))
                )
              })

              // Skip staff with no operations in the current date range
              if (staffOperations.length === 0) return null

              return (
                <div key={staffId} className="staffRow">
                  <div className="staffInfo">
                    <div className="staffAvatar">
                      <img
                        src={staff.image || "/fallback-image.jpg"}
                        alt={staff.name || "Unknown"}
                        className="staff-image"
                      />
                    </div>
                    <div className="staffDetails">
                      <p className="staff-name">{staff.name || "Loading..."}</p>
                      <small className="staff-position">{staff.position || "No Position"}</small>
                    </div>
                  </div>
                  <div
                    className="staffTimeline"
                    style={{
                      gridTemplateColumns: `repeat(${calendarDays.length}, 1fr)`,
                    }}
                  >
                    {staffOperations.map((operation, opIndex) => {
                      const operationDetail = operationDetails[operation.siteoperationtypesId] || {}
                      const { siteName, operationTypeName, operationtypesId } = getOperationDisplayName(operation)
                      const siteColor = getSiteColor(siteName)
                      const operationtypesColor = getOperationtypesColor(operationtypesId)

                      // Get site dates
                      const siteId = operationDetail.siteId
                      const siteInfo = siteNames[siteId] || {}
                      const siteStartDate = dayjs(siteInfo.startDate)
                      const siteEndDate = dayjs(siteInfo.endDate)

                      // Get operation type dates
                      const operationStartDate = dayjs(operationDetail.startDate)
                      const operationEndDate = dayjs(operationDetail.endDate)

                      // Skip if invalid dates for either
                      if (
                        (!siteStartDate.isValid() || !siteEndDate.isValid()) &&
                        (!operationStartDate.isValid() || !operationEndDate.isValid())
                      ) {
                        return null
                      }

                      // Adjust dates to be within the visible range
                      const visibleSiteStart = siteStartDate.isBefore(startDate) ? startDate : siteStartDate
                      const visibleSiteEnd = siteEndDate.isAfter(endDate) ? endDate : siteEndDate

                      const visibleOpStart = operationStartDate.isBefore(startDate) ? startDate : operationStartDate
                      const visibleOpEnd = operationEndDate.isAfter(endDate) ? endDate : operationEndDate

                      // Calculate positions relative to the visible calendar days
                      const siteStartIndex = calendarDays.findIndex((day) => day.date.isSame(visibleSiteStart, "day"))
                      const siteEndIndex = calendarDays.findIndex((day) => day.date.isSame(visibleSiteEnd, "day"))

                      const opStartIndex = calendarDays.findIndex((day) => day.date.isSame(visibleOpStart, "day"))
                      const opEndIndex = calendarDays.findIndex((day) => day.date.isSame(visibleOpEnd, "day"))

                      // Skip if not visible in current range
                      if (siteStartIndex === -1 && opStartIndex === -1) return null

                      // Calculate grid positions
                      const siteStartColumn = siteStartIndex + 1 // 1-based for grid
                      const siteEndColumn = siteEndIndex + 1
                      const siteColumnSpan = siteEndColumn - siteStartColumn + 1

                      const opStartColumn = opStartIndex + 1
                      const opEndColumn = opEndIndex + 1
                      const opColumnSpan = opEndColumn - opStartColumn + 1

                      return (
                        <React.Fragment key={`operation-${opIndex}`}>
                          {/* Site timeline bar */}
                          {siteStartIndex !== -1 && siteEndIndex !== -1 && (
                            <div
                              className="Bar siteBar"
                              style={{
                                gridColumn: `${siteStartColumn} / span ${siteColumnSpan}`,
                                backgroundColor: siteColor,
                              }}
                            >
                              <span className="BarLabel">{siteInfo.name}</span>
                            </div>
                          )}

                          {/* Operation type timeline bar */}
                          {opStartIndex !== -1 && opEndIndex !== -1 && (
                            <div
                              className="Bar operationTypeBar"
                              style={{
                                gridColumn: `${opStartColumn} / span ${opColumnSpan}`,
                                backgroundColor: operationtypesColor,
                                marginTop: siteStartIndex !== -1 ? "3px" : "0",
                                height: "5px",
                              }}
                            >
                              <span className="BarLabel operationLabel">{operationTypeName}</span>
                            </div>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              )
            })
          : !loading && <p className="no-data-message">No staff schedule available.</p>}
      </div>
    </div>
  )
}

