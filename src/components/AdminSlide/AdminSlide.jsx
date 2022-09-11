import React from "react";
import "./AdminSlide.css";
import { useNavigate } from "react-router-dom";

function AdminSlide() {
  const nav = useNavigate();
  
  return (
    <>
      <div className="right" id="sidebar">
        <ul>
          <li
            onClick={() => {
              nav("/admin/applications");
            }}
          >
            Application list
          </li>
          <li
            onClick={() => {
              nav("/admin/record");
            }}
          >
            Record track
          </li>
          <li
            onClick={() => {
              nav("/admin/booked");
            }}
          >
            Booking slot
          </li>
          <li
            onClick={() => {
              nav("/admin/userData");
            }}
          >
            Log out
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSlide;
