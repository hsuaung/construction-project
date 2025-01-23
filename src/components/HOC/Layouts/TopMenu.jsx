import React from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "../../../assets/images/sampleProfile.jpg";
// import Profile from "../assets/images/sampleProfile.jpg";

export default function TopMenu() {
  const { pathname } = useLocation();
  const titles = {
    "/": "Home",
    "/schedule": "Schedule",
    "/site": "List of Sites",
    "/staff": "List of Staffs",
    "/vehicle": "List of Vehicles",
    "/business-partner": "List of Business Partners",
    "/operation-type": "List of Operation Types",
    "/userprofile": "User Profile",
  };
  const menuTitle = titles[pathname];
  return (
    <section className="topMenu">
      <div className="menuTitle">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0L10 2L4 8L10 14L8 16L0 8L8 0Z"
              fill="#F27D14"
            />
          </svg>
        </Link>
        <h2>{menuTitle}</h2>
      </div>
      <div className="userProfile">
        <p>Welcome Back!</p>
        <div>
          <Link to="/userprofile">
            <img src={Profile} alt="profile" className="profilePopUp" />
          </Link>
        </div>
      </div>
    </section>
  );
}
