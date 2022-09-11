import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Application from "./components/Application/Application";
import Adminlogin from "./components/Adminlogin/Adminlogin";
import { AdminHome } from "./components/AdminHome/AdminHome";

import UserManage from "./components/AdminHome/UserManage/UserManage";

import { ApplicationList } from "./components/AdminHome/ApplicationList/ApplicationList";
import Booked from "./components/AdminHome/Booked/Booked";
import RecordTrack from "./components/AdminHome/RecordTrack/RecordTrack";
import ReadApp from "./components/AdminHome/ReadApplication/ReadApp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/application" element={<Application />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route
          index
          path="/admin/applications"
          element={
            <AdminHome>
              <ApplicationList />
            </AdminHome>
          }
        />
        <Route
          path="/admin/booked"
          element={
            <AdminHome>
              <Booked />
            </AdminHome>
          }
        />
        <Route
          path="/admin/record"
          element={
            <AdminHome>
              <RecordTrack />
            </AdminHome>
          }
        />
        <Route
          path="/admin/userData"
          element={
            <AdminHome>
              <UserManage />
            </AdminHome>
          }
        />
        <Route
          path="/admin"
          element={<Navigate to={"/admin/applications"} />}
        />
        <Route path="/admin/read/:id" element={<ReadApp />} />
        <Route path="*" element={<h1>Page Not Found please go back</h1>} />
      </Routes>
    </div>
  );
}

export default App;
