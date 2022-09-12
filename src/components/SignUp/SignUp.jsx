import React from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

function SignUp() {
  const [Text, setText] = useState("");
  let url = process.env.REACT_APP_SERVER_IP;
  const [password, setPassword] = useState(0);
  const [feedback, setfeedback] = useState("");
  const [loading, setLoading] = useState(false);
  let isMail = Text.includes("@");
  let location = useNavigate();

  function SignValidation(e) {
    e.preventDefault();
    setLoading(true);
    let form = new FormData(e.target);
    let valid = isMail && password >= 4;

    if (valid) {
      fetch(`${url}/sign`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
          num: form.get("num"),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            setLoading(false)
            alert("You are successfully signUp");
          } else if (data.status === 409) {
            setLoading(false);
            alert("Account al ready exist");
          }

          location(data.url, { replace: true });
        });
    }
  }

  return (
    <div className="sign bg-dark">
      <span className="circle"></span>
      <div className="logForm">
        <form
          onSubmit={SignValidation}
          action={`${process.env.REACT_APP_SERVER_IP}/sign`}
          method="post"
          className="signFormData mb-5"
        >
          <h1 className="h3" style={{ color: "aqua" }}>
            SignUp Form
          </h1>
          <div className="form-floating">
            <input
              className="label1 label form-control"
              type="text"
              name="name"
              placeholder="Enter your Name"
            />
            <label htmlFor="email">Name</label>
          </div>

          <div className="form-floating">
            <input
              className="label1  form-control"
              type="email"
              name="email"
              value={Text}
              onChange={(e) => {
                setText(e.target.value);
                switch (
                  e.target.value.includes("@") &&
                  e.target.value.includes(".")
                ) {
                  case false:
                    setfeedback("Enter correct email");
                    e.target.classList.add("is-invalid");
                    e.target.classList.remove("is-valid");
                    break;

                  default:
                    e.target.classList.remove("is-invalid");
                    e.target.classList.add("is-valid");
                    break;
                }
              }}
              placeholder="Enter your Username"
            />
            <label htmlFor="email">Email</label>
            <div className="invalid-feedback">{feedback}</div>
          </div>
          <div className="form-floating">
            <input
              className="label1 form-control"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value.length);
                switch (e.target.value.length >= 4) {
                  case false:
                    setfeedback("At least 4 character needed");

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
              placeholder="Enter your Password"
            />
            <label htmlFor="email">Password</label>
            <div className="invalid-feedback">{feedback}</div>
          </div>

          <div className="form-floating">
            <input
              className="label1 form-control"
              type="tel"
              name="num"
              placeholder="Enter Your Phone Number"
            />
            <label htmlFor="email">Phone Number</label>
          </div>

          <LoadingButton loading={loading} type="submit" variant="outlined">
            Sign Up
          </LoadingButton>
          <p style={{ color: "gray" }}>
            Have already an account?{" "}
            <Link to={"/login"}>
              <strong>Log In</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
