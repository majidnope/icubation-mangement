import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import Store from "../../utils/userStore/ContextApi";
import "./Application.css";

function Application() {
  const userData = useContext(Store);
;

  let fieldsPlaceHolder = [
    "Describe Your Team and Background ",
    "Describe Your Company and Product ",
    "Describe the problem you are trying to solve ",
    "What is unique about your  solution? ",
    "What is your value proposition for the  customer ",
    "who are your competitors and  what is your competitive advantage?",
    "Explain your revenue model",
    "What is the potential market size of the product?",
    "Upload a detailed business proposal",
  ];

  let textArea = fieldsPlaceHolder.map((el) => (
    <textarea
      className="form-control bg-dark text-light"
      name="name1"
      id=""
      cols="10"
      rows="5"
      placeholder={el}
    ></textarea>
  ));

  const updateUser = () => {
    let userAuth = jwtDecode(localStorage.getItem("token"));
    fetch(`${process.env.REACT_APP_SERVER_IP}userData`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAuth),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        userData.add(data.userData);
      });
  };
  return (
    <div className="container-fluid bg-dark  appForm">
      <div className="container d-flex align-items-center justify-content-center flex-column p-5">
        <h1 className="text-light">Application Form</h1>

        <form
          onSubmit={updateUser}
          action={`${process.env.REACT_APP_SERVER_IP}/application`}
          method="post"
          className="appliForm"
        >
          <div className="row gy-3 row-cols-2">
            <div className="form-floating col">
              <input
                type="text"
                name="name"
                className="form-control bg-dark "
                placeholder="Name"
              />
              <label className="fade show text-light" for="">
                Enter Your Name
              </label>
              <input
                type="text"
                name="id"
                className="d-none "
                readOnly
                value={userData.user._id}
              />
            </div>

            <div className="form-floating col">
              <input
                type="text"
                name="address"
                className="form-control bg-dark text-light"
                placeholder="Address"
              />
              <label className="fade show text-light" for="">
                Enter Your Address
              </label>
            </div>

            <div className="form-floating col">
              <input
                type="text"
                name="city"
                className="form-control bg-dark text-light"
                placeholder="city"
              />
              <label className="fade show text-light" for="">
                Enter Your City
              </label>
            </div>

            <div className="form-floating col">
              <input
                type="text"
                name="state"
                className="form-control bg-dark text-light"
                placeholder="State"
              />
              <label className="fade show text-light" for="">
                Enter Your State
              </label>
            </div>

            <div className="form-floating col">
              <input
                type="text"
                name="email"
                className="form-control bg-dark text-light"
                placeholder="Email"
              />
              <label className="fade show text-light" for="">
                Enter Your Email
              </label>
            </div>

            <div className="form-floating col">
              <input
                type="text"
                name="no"
                className="form-control bg-dark text-light"
                placeholder="Phone No"
              />
              <label className="fade show text-light" for="">
                Enter Your Phone No
              </label>
            </div>

            <div className="form-floating col">
              <input
                type="text"
                name="cname"
                className="form-control bg-dark text-light"
                placeholder="Company Name"
              />
              <label className="fade show text-light" for="">
                Enter Your Company Name
              </label>
            </div>
          </div>
          {textArea}
          <button className="btn btn-success text-light" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Application;
