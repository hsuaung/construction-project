import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./components/HOC/Layouts/BaseLayout";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Schedule from "./components/schedule/List";
import SiteList from "./components/site/List";
import StaffList from "./components/menu/staff/List";
import VehicleList from "./components/menu/vehicle/List";
import BusinessPartnerList from "./components/menu/businessPartner/List";
import OperationTypeList from "./components/menu/operationType/List";

import Ui from "./components/Ui";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BaseLayout />}>
          {/* Add your routes here */}

          <Route path="/ui" element={<Ui />} />

          <Route index element={<Home />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/site" element={<SiteList />} />
          <Route path="/staff" element={<StaffList />} />
          
          {/* vehicle */}
          <Route path="/vehicle" element={<VehicleList />} />
          <Route path="/vehicle/entry" element={<VehicleList />} />
          <Route path="/vehicle/edit/:id" element={<VehicleList />} />

          <Route path="/business-partner" element={<BusinessPartnerList />} />
          <Route path="/operation-type" element={<OperationTypeList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
