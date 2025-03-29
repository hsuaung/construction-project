"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useFetchData } from "../HOC/UseFetchData"
import { useCRUD } from "../HOC/UseCRUD"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import "./staffschedule.scss"

export default function Vehicle({ dateRange }) {
  const [vehicleData, setVehicleData] = useState({})
  const [groupData, setGroupData] = useState({}) // New state for group data
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

  // Fetch vehicle Details & Team Color
  useEffect(() => {
    const fetchVehicleDetails = async () => {
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
                startDate: response.data.startDate,
                endDate: response.data.endDate,
                siteId: response.data.siteId,
              }
            } catch (error) {
              console.error(`Error fetching site operation ${siteoperationtypesId}:`, error.response?.data || error)
              return {
                siteoperationtypesId,
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

        operationsData.forEach(({ siteoperationtypesId, startDate, endDate, siteId }) => {
          operationDetailsMap[siteoperationtypesId] = {
            startDate,
            endDate,
            siteId,
          }

          if (siteId && !uniqueSiteIds.includes(siteId)) {
            uniqueSiteIds.push(siteId)
          }
        })

        setOperationDetails(operationDetailsMap)

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
      } catch (err) {
        console.error("Error fetching operation details:", err)
      }
    }

    const fetchVehicleSchedule = async () => {
      if (!siteOperations?.length) return

      const uniqueVehicleIds = [...new Set(siteOperations.map((item) => item.vehicleId))]

      try {
        const vehicleData = await Promise.all(
          uniqueVehicleIds.map(async (vehicleId) => {
            try {
              const response = await axios.get(`http://localhost:8383/vehicle/getbyid/${vehicleId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              })
              return {
                vehicleId,
                name: response.data.name,
                groupId: response.data.groupId,
                image: response.data.image || "fallback-image.jpg",
              }
            } catch (error) {
              console.error(`Error fetching vehicle ${vehicleId}:`, error.response?.data || error)
              return { vehicleId, name: "Unknown Vehicle", groupId: null, image: "fallback-image.jpg" }
            }
          }),
        )

        // Store vehicle details
        const vehicleMap = {}
        const uniqueGroupIds = []

        vehicleData.forEach(({ vehicleId, name, groupId, image }) => {
          vehicleMap[vehicleId] = { name, groupId, image }

          // Collect unique group IDs for fetching group details
          if (groupId && !uniqueGroupIds.includes(groupId)) {
            uniqueGroupIds.push(groupId)
          }
        })

        setVehicleData(vehicleMap)

        // Fetch group details for all unique group IDs
        if (uniqueGroupIds.length > 0) {
          const groupDetails = await Promise.all(
            uniqueGroupIds.map(async (groupId) => {
              try {
                const response = await axios.get(`http://localhost:8383/group/getbyid/${groupId}`, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                })
                return {
                  groupId,
                  name: response.data.name,
                }
              } catch (error) {
                console.error(`Error fetching group ${groupId}:`, error.response?.data || error)
                return { groupId, name: "Unknown Group" }
              }
            }),
          )

          // Store group details
          const groupMap = {}
          groupDetails.forEach(({ groupId, name }) => {
            groupMap[groupId] = { name }
          })

          setGroupData(groupMap)
        }
      } catch (err) {
        console.error("Error fetching Vehicle details:", err)
      }
    }

    fetchVehicleDetails()
    fetchVehicleSchedule()
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

  // Get display name for the operation
  const getOperationDisplayName = (operation) => {
    const operationDetail = operationDetails[operation.siteoperationtypesId] || {}
    const siteId = operationDetail.siteId
    const operationtypesId = operationDetail.operationtypesId

    const siteName = siteNames[siteId]?.name || "Unknown Site"
    // const operationTypeName = operationTypes[operationtypesId]?.name || "Unknown Operation"

    return { siteName, operationtypesId }
  }

  // Get group name from groupId
  const getGroupName = (groupId) => {
    if (!groupId) return "No Group"
    return groupData[groupId]?.name || "Loading Group..."
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
        {loading && <p className="loading-message">Loading Vehicle schedule...</p>}
        {error && <p className="error-message">Error fetching data</p>}

        {!loading && !error && siteOperations?.length > 0
          ? // Group operations by staff
            Object.entries(
              siteOperations.reduce((acc, operation) => {
                if (!acc[operation.vehicleId]) {
                  acc[operation.vehicleId] = []
                }
                acc[operation.vehicleId].push(operation)
                return acc
              }, {}),
            ).map(([vehicleId, operations]) => {
              const vehicle = vehicleData[vehicleId] || {}

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
                <div key={vehicleId} className="staffRow">
                  <div className="staffInfo">
                    <div className="staffAvatar">
                      <img
                        src={vehicle.image || "/fallback-image.jpg"}
                        alt={vehicle.name || "Unknown"}
                        className="staff-image"
                      />
                    </div>
                    <div className="staffDetails">
                      <p className="staff-name">{vehicle.name || "Loading..."}</p>
                      <small className="staff-position">{getGroupName(vehicle.groupId)}</small>
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
                      // const operationtypesColor = getOperationtypesColor(operationtypesId)

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
                                // backgroundColor: operationtypesColor,
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

