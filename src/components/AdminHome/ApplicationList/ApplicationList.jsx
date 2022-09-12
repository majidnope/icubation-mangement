import { LinearProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Store from "../../../utils/userStore/ContextApi";
function app_update(id, status, context, index) {
  if (status === "remove") {
    let result = context.app_data.filter((el) => !(id === el._id));

    context.setApplication(result);
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/form-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: status, id: id }),
    });
  } else {
    if (!index) {
      let result = context.app_data.map((el) => {
        return el._id === id
          ? {
              ...el,
              status: status,
              progress: (() => {
                switch (status) {
                  case "pending":
                    return 40;
                  case "approved":
                    return 70;
                  case "booked":
                    return 100;
                  default:
                    break;
                }
              })(),
            }
          : { ...el };
      });
      context.setApplication(result);

      fetch(`${process.env.REACT_APP_SERVER_IP}/admin/form-update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: status, id: id }),
      });
    } else {
      let result = context.app_data.map((el) => {
        return el._id === id
          ? { ...el, status: status, slot: index }
          : { ...el };
      });

      context.setApplication(result);

      fetch(`${process.env.REACT_APP_SERVER_IP}/admin/form-update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: status, id: id, index: index }),
      });
    }
  }
}


function ApplicationList() {
  //using context api
  const app = useContext(Store);
   
  const [loading, setLoading] = useState(true);
  let nav = useNavigate();

  //updating application
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/adminhome`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        app.setApplication(result.app);
      });
  }, []);



  //new application list
  let element = app.app_data.map((el, index) =>
    el.status === "new" ? (
      <tr key={index}>
        <td>
          <li></li>
        </td>
        <td>{el._id}</td>
        <td>{el.cname}</td>
        <td>
          <button
            onClick={() => {
              nav(`/admin/read/${el._id}`);
            }}
            className="btn btn-primary btndelete"
          >
            Open
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              app_update(el._id, "pending", app);
            }}
            className="btn btn-success btndelete"
          >
            Pending
          </button>
        </td>
      </tr>
    ) : (
      ""
    )
  );
  //new pending list
  let penddingElement = app.app_data.map((el) =>
    el.status === "pending" || el.status === "approved" ? (
      <tr key={el._id}>
        <td>🔷</td>
        <td>{el._id}</td>
        <td>{el.cname}</td>
        <td>
          <button
            onClick={() => nav(`/admin/read/${el._id}`)}
            className="btn btn-primary btndelete"
          >
            Open
          </button>
        </td>
        <td>
          <button
            className={`${
              el.status === "approved" ? "disabled" : ""
            } btn btn-success btndelete`}
            onClick={
              el.status === "approved"
                ? ""
                : () => {
                    app_update(el._id, "approved", app);
                  }
            }
          >
            {el.status === "approved" ? "Approved" : "Approve"}
          </button>
        </td>
        <td>
          {el.status === "approved" ? (
            <button
              disabled
              className="btn btn-success btndelete"
              onClick={() => {
                app_update(el._id, "declined", app);
              }}
            >
              Decline
            </button>
          ) : (
            <button
              className="btn btn-danger btndelete"
              onClick={() => {
                app_update(el._id, "declined", app);
              }}
            >
              Decline
            </button>
          )}
        </td>
      </tr>
    ) : (
      ""
    )
  );
//  loading confirmation
  useEffect(() => {
    console.log(app.adminState, "form record");
    if ((element.length=== 0||penddingElement === 0) && app.adminState === true) {
      setLoading(true);
    } else if (app.adminState === false) {
      setLoading(false);
    } else if (app.adminState === true) {
      setLoading(true);
    }
  });



  return (
    <>
      <div className="left">
        <div className="box">
          <h2
            style={{
              color: "#02b6ff",
              fontSize: "2vw",
              fontFamily: "monospace",
            }}
          >
            New applications{" "}
          </h2>
          <LinearProgress hidden={loading} />
          <div className="table-responsive ">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Application ID</th>
                  <th scope="col">Company name</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{element}</tbody>
            </table>
          </div>
        </div>

        <div className="box">
          <h2
            style={{
              color: "#02b6ff",
              fontSize: "2vw",
              fontFamily: "monospace",
            }}
          >
            Pending applications
          </h2>
          <LinearProgress hidden={loading} />

          <div className="table-responsive">
            <table className="table table-dark table-striped ">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Application ID</th>
                  <th scope="col">Company name</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{penddingElement}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export { ApplicationList, app_update };
