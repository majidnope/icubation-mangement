import React, { useContext, useEffect, useRef, useState } from "react";
import "./AdminHome.css";
import AdminNav from "../Navs/AdminNav/AdminNav";
import AdminSlide from "../AdminSlide/AdminSlide";
import Store from "../../utils/userStore/ContextApi";


function AdminHome({ children }) {
  const app = useContext(Store);
  let bodyElement = useRef();
  let scrollbar = useRef();

  useEffect(() => {
   app.adminData([],[], false);
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/adminhome`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
   
        app.adminData(data.users, data.app,true);
      });
  }, []);

  //fetching application data from database

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

  return (
    <div className="adminhome">
      <AdminNav count={app.newAppCount} />
      <div className="scrollbar"></div>
      <div className="progressbar" ref={scrollbar}></div>
      <div onScroll={scrollProgress} className="body" ref={bodyElement}>
        <AdminSlide />
        {children}
      </div>
    </div>
  );
}

export { AdminHome };
