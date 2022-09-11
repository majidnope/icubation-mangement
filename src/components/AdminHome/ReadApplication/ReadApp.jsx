import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Store from "../../../utils/userStore/ContextApi";
import "./style.css";

function ReadApp() {
  const fontS = { fontWeight: "500", color: "gray" }
  let bodyElement = useRef();
  let scrollbar = useRef();
  let cnameIn;
  const [cname, setCname] = useState("");
  function scrollProgress(e) {
    let totalHeight = e.target.scrollHeight - document.body.clientHeight;
    let Progress = (e.target.scrollTop / totalHeight) * 100;
    scrollbar.current.style.height = `${Progress.toFixed()}%`;
  }

  useEffect(() => {
    if (bodyElement.current.clientHeight === bodyElement.current.scrollHeight) {
      bodyElement.current.style.minHeight = "100%";
      bodyElement.current.style.maxHeight = "";
    } else {
      bodyElement.current.style.minHeight = "";
      bodyElement.current.style.maxHeight = "100%";
    }
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/adminhome`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        app.adminData(data.users, data.app);
      });
  }, []);
  useEffect(() => {
    setCname(cnameIn);
  });

  let param = useParams();

  const app = useContext(Store);

  let application = app.app_data.map((el, index) => {
    let element = () => {
      if (el._id === param.id) {
        cnameIn = el.cname;
        return (
          <div key={index} className="container w-100 h-100 text-light">
            <h4>{el.cname}</h4>
            <hr className="text-light" />
            <br />

            <div>
              <h6>Address</h6>

              <span
                style={{
                  ...fontS,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={fontS}>{el.address}</p>
                <span>
                  {" "}
                  <p style={fontS}>Client name : { el.name}</p>
                  <p style={fontS}>Email : {el.email}</p>
                </span>
              </span>
              <br />
              <hr />
              <h6>Address</h6>
              <span
                style={{
                  ...fontS,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={fontS}>{el.address}</p>
                <p style={fontS}>{el.email}</p>
              </span>
            </div>
          </div>
        );
      }
    };
    return element();
  });

  return (
    <>
      <div className="adminhome">
        <div className="scrollbar"></div>
        <div className="progressbar" ref={scrollbar}></div>
        <div onScroll={scrollProgress} className="body" ref={bodyElement}>
          <div className="container">
            <div className="box">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item ">
                    <Link style={{ color: "white" }} to={-1}>
                      Applications
                    </Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    {cname ? cname : ""}
                  </li>
                </ol>
              </nav>
              {application}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadApp;
