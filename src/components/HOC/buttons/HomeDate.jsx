import React, { useState, useEffect } from "react";
import "../../../assets/styles/buttons/homeDate.scss";

const HomeDate = () => {
  // const [selectedDate, setSelectedDate] = useState("2025-01-23");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedView, setSelectedView] = useState("day");
  const [weekRange, setWeekRange] = useState("");
  const [monthDates, setMonthDates] = useState([]);

  // Format date as MM.DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${month}.${day}`;
  };

  // Calculate week range
  useEffect(() => {
    const calculateWeekRange = () => {
      const currentDate = new Date(selectedDate);
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // Saturday

      setWeekRange(`${formatDate(weekStart)}-${formatDate(weekEnd)}`);
    };

    if (selectedView === "week") {
      calculateWeekRange();
    } else {
      setWeekRange("");
    }
  }, [selectedDate, selectedView]);

  // Calculate month dates
  useEffect(() => {
    const calculateMonthDates = () => {
      const currentDate = new Date(selectedDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const dates = [];
      let current = new Date(firstDayOfMonth);

      // Include days from the previous month to fill the first week
      while (current.getDay() !== 0) {
        current.setDate(current.getDate() - 1);
      }

      // Generate all dates for the calendar grid
      while (current <= lastDayOfMonth || current.getDay() !== 0) {
        dates.push(new Date(current).toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }

      setMonthDates(dates);
    };

    if (selectedView === "month") {
      calculateMonthDates();
    }
  }, [selectedDate, selectedView]);

  // Handle date navigation
  // const adjustDate = (direction) => {
  //   const currentDate = new Date(selectedDate);

  //   if (direction === "prev") {
  //     if (selectedView === "day") {
  //       currentDate.setDate(currentDate.getDate() - 1);
  //     } else if (selectedView === "week") {
  //       currentDate.setDate(currentDate.getDate() - 7);
  //     } else if (selectedView === "month") {
  //       currentDate.setMonth(currentDate.getMonth() - 1);
  //     }
  //   } else if (direction === "next") {
  //     if (selectedView === "day") {
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     } else if (selectedView === "week") {
  //       currentDate.setDate(currentDate.getDate() + 7);
  //     } else if (selectedView === "month") {
  //       currentDate.setMonth(currentDate.getMonth() + 1);
  //     }
  //   } else if (direction === "today") {
  //     currentDate.setDate(new Date());
  //   }

  //   setSelectedDate(currentDate.toISOString().split("T")[0]);
  // };
  const adjustDate = (direction) => {
    let currentDate = new Date(selectedDate);
  
    if (direction === "prev") {
      if (selectedView === "day") {
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (selectedView === "week") {
        currentDate.setDate(currentDate.getDate() - 7);
      } else if (selectedView === "month") {
        currentDate.setMonth(currentDate.getMonth() - 1);
      }
    } else if (direction === "next") {
      if (selectedView === "day") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (selectedView === "week") {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (selectedView === "month") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    } else if (direction === "today") {
      currentDate = new Date(); // Set to today's date
    }
  
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };

  return (
    <div className="datePicker">
      {/* Date Navigation */}
      <div className="dateNavigateDiv">
        <div className="dateNavigation">
          <button onClick={() => adjustDate("prev")}>{"<"}</button>

          <div className="selectedDate">
            {selectedView === "week"
              ? weekRange
              : selectedView === "month"
              ? new Date(selectedDate).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })
              : formatDate(selectedDate)}
          </div>
          <button onClick={() => adjustDate("next")}>{">"}</button>
        </div>

        <button className="todayBtn" onClick={() => adjustDate("today")}>
          today
        </button>
      </div>

      {/* Calendar Tabs */}
      <div className="calendarTabs">
        {["day", "week", "month"].map((view) => (
          <button
            key={view}
            className={selectedView === view ? "active" : ""}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeDate;
