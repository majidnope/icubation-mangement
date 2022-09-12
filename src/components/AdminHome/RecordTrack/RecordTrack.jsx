import React, { useContext, useState } from "react";
import "./style.css";
import Store from "../../../utils/userStore/ContextApi";
import { useNavigate } from "react-router-dom";
import { app_update } from "../ApplicationList/ApplicationList";
import { LinearProgress } from "@mui/material";
import { useEffect } from "react";

function RecordTrack() {
  const app = useContext(Store);
  let nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const table = { data: false };
  table.data = app.app_data?.map((el, index) =>
    el.status === "declined" ? (
      <tr key={index}>
        <td>🔹</td>
        <td>{el._id}</td>
        <td>{el.cname}</td>
        <td>{el.status}</td>
        <td>
          <div
            style={{
              "--progressAdmin": `${el.progress}%`,
              "--progressColor": "crimson",
            }}
            className="usersProgress w-50"
            data-progress={"🚫"}
          ></div>
        </td>
        <td>
          <button
            className="btn w-75 btndelete"
            onClick={() => nav(`/admin/read/${el._id}`)}
          >
            Open
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger btndelete w-100"
            onClick={() => app_update(el._id, "remove", app)}
          >
            Remove
          </button>
        </td>
      </tr>
    ) : (
      <tr key={index}>
        <td>
          <li></li>
        </td>
        <td>{el._id}</td>
        <td>{el.cname}</td>
        <td>{el.status}</td>
        <td>
          <div
            data-progress={el.progress}
            style={{
              marginLeft: ".5vw",
              "--progressAdmin": `${el.progress}%`,
              "--progressColor": "rgb(0, 247, 255)",
            }}
            className="usersProgress w-50 "
          ></div>
        </td>
        <td>
          <button
            onClick={() => nav(`/admin/read/${el._id}`)}
            className="btn w-100 btndelete"
          >
            Open
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger w-100 btndelete"
            onClick={() => app_update(el._id, "remove", app)}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  );
  
// ? loading confirmation
  useEffect(() => {
    console.log(app.adminState, 'form record');
    if ((table.data.length===0) && app.adminState===true) {
      setLoading(true);
    } else if (app.adminState===false) {
      setLoading(false);
    } else {
      setLoading(true)
    }
  });


  return (
    <div className="left">
      <div className="box" style={{ color: "red" }}>
        <h2
          style={{ color: "#02b6ff", fontSize: "2vw", fontFamily: "monospace" }}
        >
          Recode Track
        </h2>
        <LinearProgress hidden={loading} />

        <div className="table-responsive ">
          <table className="table table-sm fs-6 table-dark table-striped ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Application Id</th>
                <th scope="col">Company Name</th>
                <th scope="col">Status</th>
                <th scope="col">Progress</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{table.data}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecordTrack;
