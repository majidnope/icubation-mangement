import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import Store from "../../utils/userStore/ContextApi";
import "./Home.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";

import { Skeleton } from "@mui/material";
import TimeDelay from "../../utils/TimeDelay";

function Home() {
  const emoji = ["😁", "😎", "🥰", "🤑", "✌😃"];
  let randomIndex = () => Math.floor(Math.random() * 5);

  let [newOne, setNewOne] = useState(randomIndex());
  let location = useLocation();
  let nav = useNavigate();
  const userData = useContext(Store);
  let [, setParams] = useSearchParams();
  const [progress, setProgress] = useState(0);

  let token = location.search?.split("token=")[1]
    ? location.search.split("token=")[1]
    : null;
  if (token) localStorage.setItem("token", token);
  const isThereAnyDataBase = (body) => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_SERVER_IP}/userData`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data.isThere);
        });
    });
  };

  useEffect(() => {
    nav("/");
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token"));

      isThereAnyDataBase(decoded).then((isThere) => {
        if (!isThere) {
          userData.remove();
          localStorage.removeItem("token");
        } else {
          userData.add(decoded);
          setParams("");
        }
      });
    } else {
      userData.remove("");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token"));
      userData.addUser(decoded);
      fetch(`${process.env.REACT_APP_SERVER_IP}/userData`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decoded),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          delete decoded.iat;
          const haveSameData = function (obj1, obj2) {
            const obj1Length = Object.keys(obj1).length;
            const obj2Length = Object.keys(obj2).length;

            if (obj1Length === obj2Length) {
              return Object.keys(obj1).every(
                (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
              );
            }
            return false;
          };
          const NoChanged = haveSameData(data.userData, decoded);

          if (NoChanged) {
            userData.addUser(decoded);
            document.documentElement.style.setProperty(
              "--progress",
              `${data.userData.progress === 0 ? "" : data.userData.progress}%`
            );
            //setting up progress state whn page reload or mount or update

            setProgress(data.userData.progress);
          } else {
            userData.addUser(data.userData);
            //setting up css variable for progress
            document.documentElement.style.setProperty(
              "--progress",
              `${data.userData.progress === 0 ? "" : data.userData.progress}%`
            );
            //setting up progress state whn page reload or mount or update

            setProgress(data.userData.progress);
          }
        });
    }
    if (!userData.loginState) {
      document.documentElement.style.setProperty("--progress", `*`);
    }
  }, []);

  return (
    <div className="homePage">
      <nav className="navbar navbarHome navbar-dark " style={{ height: "10%" }}>
        <div
          className="container-fluid w-100 h-100 bg-dark "
          style={{ position: "absolute", zIndex: "100" }}
        >
          <div className=" navbar-brand">
            <img
              width="30px"
              src="https://pngimg.com/uploads/egg/egg_PNG46.png"
              alt="logo"
              style={{ marginRight: "15px" }}
            />
            Incub
            <span style={{ color: "var(--navBtn)" }} className="dot">
              .
            </span>
            tion
          </div>
          <button
            onClick={() => setNewOne(() => Math.floor(Math.random() * 5))}
            className="navbar-toggler menuBtn"
            data-bs-target="#menu"
            data-bs-toggle="offcanvas"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="menu" className="offcanvas offcanvas-end" tabindex="-1">
            <div
              className="offcanvas-header"
              style={{ background: "var(--navBtn)" }}
            >
              <h5 className="offcanvas-title">{emoji[newOne]}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body bg-dark">
              <div className="vstack gap-4">
                <div className="add-app-btn">
                  {userData.user.submitted || !userData.loginState ? (
                    ""
                  ) : (
                    <Link to={"/application"}>
                      <p className="pi"> Application</p>
                    </Link>
                  )}
                </div>

                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    userData.remove();
                    setProgress(0);
                    document.documentElement.style.setProperty(
                      "--progress",
                      `*`
                    );
                  }}
                  className="logOut nav-link w-100 text-light"
                >
                  {userData.loginState ? (
                    "Sign Out"
                  ) : (
                    <Link
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      to={"/login"}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="bg h-100 w-100 container-fluid d-flex align-items-center flex-column">
        <div
          style={{ transform: "scale(.9)" }}
          className="vstack align-items-center spinHolder"
        >
          <div className="switchColor" data-tooltip={"Theme"}>
            <span
              onClick={() => {
                document.documentElement.style.setProperty(
                  "--bg",
                  `var(--neonColor)`
                );
                document.documentElement.style.setProperty(
                  "--navBtn",
                  `var(--neon)`
                );
                document.documentElement.style.setProperty(
                  "--navColor",
                  `var(--neonNav)`
                );
              }}
            ></span>
            <span
              onClick={() => {
                document.documentElement.style.setProperty(
                  "--bg",
                  `var(--sky)`
                );
                document.documentElement.style.setProperty(
                  "--navColor",
                  `var(--skyNav)`
                );
                document.documentElement.style.setProperty(
                  "--navBtn",
                  `var(--skyBtn)`
                );
              }}
            ></span>
            <span
              onClick={() => {
                document.documentElement.style.setProperty(
                  "--bg",
                  `var(--mango)`
                );
                document.documentElement.style.setProperty(
                  "--navColor",
                  `var(--mangoNav)`
                );
                document.documentElement.style.setProperty(
                  "--navBtn",
                  `var(--mangoBtn)`
                );
              }}
            ></span>
          </div>

          <div className="h-100 w-100 container d-flex align-items-center justify-content-center">
            <div className="progressCircle">
              <TimeDelay
                time={5000}
                compMain={
                  <Skeleton
                    className="progressSkeleton"
                    animation="wave"
                    style={{
                      zIndex: "3",
                      position: "absolute",
                      aspectRatio: "1/1",
                      
                    }}
                    width={"50%"}
                    height={"50%"}
                    variant={"circular"}
                  />
                }
              />
              <span
                className="innerSpin"
                data-progress={
                  progress === "rejected"
                    ? "Rejected"
                    : progress + "% Completed"
                }
              ></span>
            </div>
            <div className="lines container">
              <p>Welcome</p>

              <p>{userData.loginState ? userData.user.name : "Guest"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
