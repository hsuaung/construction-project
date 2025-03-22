import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
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

import ProtectedRoute from "./components/auth/ProtectedRoute";

import StaffDash from "./components/StaffDash";
import NoAccess from "./components/NoAccess";
import NotFound from "./components/NotFound";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BaseLayout />}>
          <Route path="/ui" element={<Ui />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="/userprofile" element={<UserProfile />} />

          {/* Admin Route Start */}
          <Route
            index
            element={<ProtectedRoute requiredRole="admin" component={Home} />}
          />
          <Route path="/business-partner" element={
              <ProtectedRoute
                requiredRole="admin"
                component={BusinessPartnerList}
              />
            }
          />
          <Route path="/business-partner/entry" element={
            <ProtectedRoute
              requiredRole="admin"
              component={BusinessPartnerList}
            />
          }
          />
          <Route path="/business-partner/edit/:id" element={
              <ProtectedRoute
                requiredRole="admin"
                component={BusinessPartnerList}
              />
            }
          />
          <Route
            path="/operation-type"
            element={
              <ProtectedRoute
                requiredRole="admin"
                component={OperationTypeList}
              />
            }
          />
          <Route
            path="/operation-type/entry"
            element={
              <ProtectedRoute
                requiredRole="admin"
                component={OperationTypeList}
              />
            }
          />
          <Route
            path="/operation-type/edit/:id"
            element={
              <ProtectedRoute
                requiredRole="admin"
                component={OperationTypeList}
              />
            }
          />
          <Route
            path="/vehicle"
            element={
              <ProtectedRoute requiredRole="admin" component={VehicleList} />
            }
          />
          <Route
            path="/vehicle/entry"
            element={
              <ProtectedRoute requiredRole="admin" component={VehicleList} />
            }
          />
          <Route
            path="/vehicle/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin" component={VehicleList} />
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRoute requiredRole="admin" component={StaffList} />
            }
          />
          <Route
            path="/staff/entry"
            element={
              <ProtectedRoute requiredRole="admin" component={StaffList} />
            }
          />
          <Route
            path="/staff/team"
            element={
              <ProtectedRoute requiredRole="admin" component={StaffList} />
            }
          />
          <Route
            path="/staff/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin" component={StaffList} />
            }
          />
          <Route
            path="/site"
            element={
              <ProtectedRoute requiredRole="admin" component={SiteList} />
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute requiredRole="admin" component={Schedule} />
            }
          />
          {/* Admin Route End */}

          {/* Staff Route Start  */}
          <Route
            path="/staffDashboard"
            element={
              <ProtectedRoute requiredRole="staff" component={StaffDash} />
            }
          />

          {/* Staff Route End  */}

          <Route path="/no-access" element={<NoAccess replace />} />
          <Route path="*" element={<NotFound replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

