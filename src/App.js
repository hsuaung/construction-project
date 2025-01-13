import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Schedule from './pages/schedule/List';
import SiteList from './pages/site/List';
import StaffList from './pages/menu/staff/List';
import VehicleList from './pages/menu/vehicle/List';
import BusinessPartnerList from './pages/menu/businessPartner/List';
import OperationTypeList from './pages/menu/operationType/List';
import './App.scss';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BaseLayout />}>
          {/* Add your routes here */}
          <Route index element={<Home />} />
          <Route path="/userprofile" element={<UserProfile/>} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/site" element={<SiteList />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/vehicle" element={<VehicleList />} />
          <Route path="/business-partner" element={<BusinessPartnerList />} />
          <Route path="/operation-type" element={<OperationTypeList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
