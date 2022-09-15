import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, LoadingButton } from "@mui/lab";

import "./Login.css";

function Login() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState(0);
  const [typeOFAlert,setAlertType] = useState('')
  const [loading, setLoading] = useState(false);
  const [AlertMessage, setAlert] = useState("");
  const [loggedIn, setLoginState] = useState(false);
  const [feedbackForPassword, setfeedbackForPassword] = useState("");
  const passwordFeedback = useRef();
  let location = useNavigate();
  let url = process.env.REACT_APP_SERVER_IP;
  let isMail = text.includes("@");

  function validate(e) {
    e.preventDefault();
    let form = new FormData(e.target);

    let valid = isMail && password >= 4;
    if (valid) {
      setLoading(true);
      fetch(`${url}/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          switch (data.status) {
            case 200:
              setLoading(false);

              setAlert("Successfully logged in");
              setAlertType('success')
              setLoginState(true)

              break;
            case 204:
              setLoading(false);
                 setAlertType("error");
            setLoginState(true);
              setAlert("This account is not exist");
              break;
            case 206:
              setLoading(false);
                 
              setLoginState(false);
              setfeedbackForPassword("Password is incorrect");
             
              passwordFeedback.current.classList.add("is-invalid");
              break;
            default:
              break;
          }
          setTimeout(()=>location(data.url, { replace: true }),1500)
        });
    }
  }

  return (
    <div className="login bg-dark">
      {loggedIn ? (
        <Alert
          className="SlideIn"
          style={{ zIndex: "4", top: "0", position: "absolute" }}
          severity={typeOFAlert}
        >
          {AlertMessage}
        </Alert>
      ) : (
        ""
      )}
      <span className="circle"></span>

      <div className="logForm">
        <form onSubmit={validate} className="form1">
          <h1 className="h1">Log In Form</h1>
          <div className="form-floating">
            <input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                switch (
                  e.target.value.includes("@") &&
                  e.target.value.includes(".")
                ) {
                  case false:
                    e.target.classList.add("is-invalid");
                    e.target.classList.remove("is-valid");
                    break;

                  default:
                    e.target.classList.remove("is-invalid");
                    e.target.classList.add("is-valid");
                    break;
                }
              }}
              className="label form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
            <label htmlFor="email">Email</label>
            <div className="invalid-feedback">Enter Valid E-Mail</div>
          </div>

          <div className="form-floating">
            <input
              className="label form-control"
              onChange={(e) => {
                setPassword(e.target.value.length);

                switch (e.target.value.length >= 4) {
                  case false:
                    setfeedbackForPassword("At least 4 character needed");
                    e.target.classList.add("is-invalid");

                    e.target.classList.remove("is-valid");

                    break;

                  default:
                    e.target.classList.remove("is-invalid");
                    e.target.classList.add("is-valid");
                    break;
                }
              }}
              name="password"
              ref={passwordFeedback}
              type="password"
              placeholder="Password"
            />
            <label htmlFor="email">Password</label>
            <div className="invalid-feedback">{feedbackForPassword}</div>
          </div>

          <hr />
          <LoadingButton loading={loading} type="submit" variant="outlined">
            Sign In
          </LoadingButton>

          <p style={{ color: "gray" }}>
            Don't have an account?
            <Link to={"/signup"}>
              <strong>Sign Up Here</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
