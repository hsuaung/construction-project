// import React, { useState, useEffect } from "react";

// import "../../../assets/styles/buttons/schedularDate.scss";
// const SchedularDate = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedView, setSelectedView] = useState("week");
//   const [weekRange, setWeekRange] = useState("");
//   const [monthDates, setMonthDates] = useState([]);

//   // Format date as MM.DD
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const month = (d.getMonth() + 1).toString().padStart(2, "0");
//     const day = d.getDate().toString().padStart(2, "0");
//     return `${month}.${day}`;
//   };

//   // Calculate week range
//   useEffect(() => {
//     const calculateWeekRange = () => {
//       const currentDate = new Date(selectedDate);
//       const weekStart = new Date(currentDate);
//       weekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday

//       const weekEnd = new Date(weekStart);
//       weekEnd.setDate(weekStart.getDate() + 6); // Saturday

//       setWeekRange(`${formatDate(weekStart)}-${formatDate(weekEnd)}`);
//     };

//     if (selectedView === "week") {
//       calculateWeekRange();
//     } else {
//       setWeekRange("");
//     }
//   }, [selectedDate, selectedView]);

//   // Calculate month dates
//   useEffect(() => {
//     const calculateMonthDates = () => {
//       const currentDate = new Date(selectedDate);
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();

//       const firstDayOfMonth = new Date(year, month, 1);
//       const lastDayOfMonth = new Date(year, month + 1, 0);

//       const dates = [];
//       let current = new Date(firstDayOfMonth);

//       // Include days from the previous month to fill the first week
//       while (current.getDay() !== 0) {
//         current.setDate(current.getDate() - 1);
//       }

//       // Generate all dates for the calendar grid
//       while (current <= lastDayOfMonth || current.getDay() !== 0) {
//         dates.push(new Date(current).toISOString().split("T")[0]);
//         current.setDate(current.getDate() + 1);
//       }

//       setMonthDates(dates);
//     };

//     if (selectedView === "month") {
//       calculateMonthDates();
//     }
//   }, [selectedDate, selectedView]);

//   // Handle date navigation
//   const adjustDate = (direction) => {
//     const currentDate = new Date(selectedDate);

//     if (direction === "prev") {
//       if (selectedView === "day") {
//         currentDate.setDate(currentDate.getDate() - 1);
//       } else if (selectedView === "week") {
//         currentDate.setDate(currentDate.getDate() - 7);
//       } else if (selectedView === "month") {
//         currentDate.setMonth(currentDate.getMonth() - 1);
//       }
//     } else if (direction === "next") {
//       if (selectedView === "day") {
//         currentDate.setDate(currentDate.getDate() + 1);
//       } else if (selectedView === "week") {
//         currentDate.setDate(currentDate.getDate() + 7);
//       } else if (selectedView === "month") {
//         currentDate.setMonth(currentDate.getMonth() + 1);
//       }
//     } else if (direction === "today") {
//       currentDate.setTime(new Date().getTime());
//     }

//     setSelectedDate(currentDate.toISOString().split("T")[0]);
//   };

//   return (
//     <div className="schedularDatePicker">
//       {/* Date Navigation */}
//       <div className="dateNavigateDiv">
//         <div className="dateNavigation">
//           <button onClick={() => adjustDate("prev")}>{"<"}</button>

//           <div className="selectedDate">
//             {selectedView === "week"
//               ? weekRange
//               : selectedView === "month"
//               ? new Date(selectedDate).toLocaleString("default", {
//                   month: "long",
//                   year: "numeric",
//                 })
//               : formatDate(selectedDate)}
//           </div>
//           <button onClick={() => adjustDate("next")}>{">"}</button>
//         </div>

//         <button className="todayBtn" onClick={() => adjustDate("today")}>
//           today
//         </button>
//       </div>

//       {/* Calendar Tabs */}
//       <div className="calendarTabs">
//         {["week", "month"].map((view) => (
//           <button
//             key={view}
//             className={selectedView === view ? "active" : ""}
//             onClick={() => setSelectedView(view)}
//           >
//             {view}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SchedularDate;


import { useState, useEffect } from "react"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import isoWeek from "dayjs/plugin/isoWeek"
import "../../../assets/styles/buttons/schedularDate.scss"

// Extend dayjs with plugins
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

const SchedularDate = ({ onDateRangeChange, initialView = "month", initialDate = dayjs() }) => {
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(dayjs(initialDate))
  // State for view mode (week or month)
  const [selectedView, setSelectedView] = useState(initialView)
  // State for calendar days (for month view)
  const [calendarDays, setCalendarDays] = useState([])

  // Format date range for display (e.g., "1-1-2025 ~ 31-1-2025")
  const formatDateRange = () => {
    if (selectedView === "week") {
      const startOfWeek = selectedDate.startOf("week")
      const endOfWeek = selectedDate.endOf("week")
      return `${startOfWeek.format("D-M-YYYY")} ~ ${endOfWeek.format("D-M-YYYY")}`
    } else {
      const startOfMonth = selectedDate.startOf("month")
      const endOfMonth = selectedDate.endOf("month")
      return `${startOfMonth.format("D-M-YYYY")} ~ ${endOfMonth.format("D-M-YYYY")}`
    }
  }

  // Generate calendar days for month view
  useEffect(() => {
    const generateCalendarDays = () => {
      const daysArray = []
      // const startOfMonth = selectedDate.startOf("month")
      // const endOfMonth = selectedDate.endOf("month")
      let startDay = selectedView === "week" ? selectedDate.startOf("week") : selectedDate.startOf("month")
      let endDay = selectedView === "week" ? selectedDate.endOf("week") : selectedDate.endOf("month")

      // Get the first day of the month
      // let currentDay = startOfMonth.startOf("week")
      // let currentDay = startOfMonth
      let currentDay = startDay

      // Generate days until we reach the end of the month's last week
      while (currentDay.isBefore(endDay) || currentDay.isSame(endDay,"day")) {
        daysArray.push({
          date: currentDay,
          dayOfMonth: currentDay.date(),
          isCurrentMonth: selectedView === "month" ? currentDay.month === selectedDate.month() : true,
          // isCurrentMonth: true,
          weekday:currentDay.format("dd"),
          isToday: currentDay.isSame(dayjs(), "day"),
        })
        currentDay = currentDay.add(1, "day")
      }

      setCalendarDays(daysArray)
    }

    generateCalendarDays()
  }, [selectedDate,selectedView])

  // Notify parent component when date range changes
  useEffect(() => {
    let start, end

    if (selectedView === "week") {
      start = selectedDate.startOf("week")
      end = selectedDate.endOf("week")
    } else {
      start = selectedDate.startOf("month")
      end = selectedDate.endOf("month")
    }

    onDateRangeChange && onDateRangeChange(start, end, selectedView)
  }, [selectedDate, selectedView, onDateRangeChange])

  // Handle date navigation (prev, next, today)
  // const adjustDate = (direction) => {
  //   if (direction === "prev") {
  //     if (selectedView === "week") {
  //       setSelectedDate(selectedDate.subtract(1, "week"))
  //     } else {
  //       setSelectedDate(selectedDate.subtract(1, "month"))
  //     }
  //   } else if (direction === "next") {
  //     if (selectedView === "week") {
  //       setSelectedDate(selectedDate.add(1, "week"))
  //     } else {
  //       setSelectedDate(selectedDate.add(1, "month"))
  //     }
  //   } else if (direction === "today") {
  //     setSelectedDate(dayjs())
  //   }
  // }
  const adjustDate = (direction) => {
    if (direction === "prev") {
      setSelectedDate(selectedView === "week" ? selectedDate.subtract(1, "week") : selectedDate.subtract(1, "month"))
    } else if (direction === "next") {
      setSelectedDate(selectedView === "week" ? selectedDate.add(1, "week") : selectedDate.add(1, "month"))
    } else if (direction === "today") {
      setSelectedDate(dayjs())
    }
  }

  // Handle view change (week or month)
  const changeView = (view) => {
    setSelectedView(view)
  }

  return (
   <div className="ScheduleDateflexCol">
    <div className="schedularDatePicker">
      {/* Date Navigation */}
      <div className="dateNavigateDiv">
        <div className="dateNavigation">
          <button className="nav-btn" onClick={() => adjustDate("prev")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.48291L10 1.86222L4 6.00015L10 10.1381L8 11.5174L0 6.00015L8 0.48291Z" fill="#F27D14"/>
          </svg>
          </button>
          <div className="selectedDate">{formatDateRange()}</div>
          <button className="nav-btn" onClick={() => adjustDate("next")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.65934 11.05L0.583257 9.72522L6.34597 5.42987L0.117708 1.45559L2.03861 0.0238068L10.343 5.32285L2.65934 11.05Z" fill="#F27D14"/>
            </svg>
          </button>
        </div>

        <button className="todayBtn" onClick={() => adjustDate("today")}>
          today
        </button>
      </div>

      {/* Calendar Tabs */}
      <div className="calendarTabs">
        <button className={`view-btn ${selectedView === "week" ? "active" : ""}`} onClick={() => changeView("week")}>
          Week
        </button>
        <button className={`view-btn ${selectedView === "month" ? "active" : ""}`} onClick={() => changeView("month")}>
          Month
        </button>
      </div>
    </div>
    <div className="calendarTimeline">
      {/* Calendar Days Header (only for month view) */}
      {selectedView === "month" && (
        <div className="calendar-days-container">
            <div className="labels"></div>
            <div className="calendar-days">
            <div className="days-header">
              {calendarDays.map((day, index) => (
                <div key={`header-${index}`} className={`day-header ${day.isToday ? "today" : ""}`}>
                  {day.weekday}
                </div>
              ))}
            </div>
            <div className="days-grid">
              {calendarDays.map((day, index) => (
                <div
                  key={`day-${index}`}
                  className={`day-cell ${day.isToday ? "today" : ""}`}
                >
                  {day.dayOfMonth}
                </div>
              ))}
            </div>
            </div>
        </div>
      )}
      {selectedView === "week" && (
        <div className="calendar-days-container">
            <div className="labels"></div>
            <div className="calendar-days">
            <div className="days-header-week">
              {calendarDays.map((day, index) => (
                <div key={`header-${index}`} className={`day-header-week ${day.isToday ? "today" : ""}`}>
                  {day.weekday}
                </div>
              ))}
            </div>
            <div className="days-grid-week">
              {calendarDays.map((day, index) => (
                <div
                  key={`day-${index}`}
                  className={`day-cell-week ${day.isToday ? "today" : ""}`}
                >
                  {day.dayOfMonth}
                </div>
              ))}
            </div>
            </div>
        </div>
      )}
    </div>
   </div>
    
  )
}

export default SchedularDate

