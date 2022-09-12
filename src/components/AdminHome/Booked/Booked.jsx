import React, { useContext, useEffect, useRef, useState } from "react";
import Store from "../../../utils/userStore/ContextApi";
import { app_update } from "../ApplicationList/ApplicationList";

function Booked() {
  const Company = useContext(Store);
  const opt = useRef();
  const submitBtn = useRef();
  const [indexOfSlot, setIndexOfSlot] = useState(NaN);

  const Slot = () => {
    return Array.from({ length: 60 }, (item, index) => {
      let cname;
      let isExist = Company.app_data.some((el) => {
        if (el.slot == index) {
          cname = el.cname;
          return true;
        }
        return false;
      });
      return isExist ? (
        <div
          style={{ height: "50px", width: "50px" }}
          data-cname={cname.substring(0, 5)}
          data-index={index}
          onClick={(e) => {
            setIndexOfSlot(e.target.dataset.index);
          }}
          data-bs-toggle="modal"
          data-bs-target="#cnameOption"
          role={"button"}
          className="col-1 m-3 slot booked"
          key={index}
        ></div>
      ) : (
        <div
          style={{ height: "50px", width: "50px" }}
          data-index={index}
          onClick={(e) => {
            setIndexOfSlot(e.target.dataset.index);
          }}
          data-bs-toggle="modal"
          data-bs-target="#cnameOption"
          role={"button"}
          className="col-1 m-3 slot"
          key={index}
        ></div>
      );
    });
  };
  let options = Company.app_data.map(function (el, index) {
    if (el.status === "approved") {
      return (
        <option data-id={el._id} key={index}>
          {el.cname}
        </option>
      );
    }
  });

  function BookedSlot(e) {
    e.preventDefault();
    let bookedSlot_info = new FormData(e.target);
    if (!opt.current.selectedIndex == 0) {
      let name = bookedSlot_info.get("selected_cname");
      let id = opt.current.options[opt.current.selectedIndex].dataset.id;
      let index = indexOfSlot;
     
      app_update(id, "booked", Company, index);
    } else {
      alert("please select a company");
    }
  }

  return (
    <div className="left">
      <div className="box row">
        <h2
          style={{ color: "#02b6ff", fontSize: "2vw", fontFamily: "monospace" }}
        >
          Booking Slots
        </h2>
        <Slot />
      </div>
      <div className="modal fade" id="cnameOption">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Please select a company</div>
            </div>
            <form onSubmit={BookedSlot}>
              <div className="modal-body">
                <select
                  placeholder="please select"
                  onChange={(e) => {}}
                  ref={opt}
                  name="selected_cname"
                  className="form-select"
                >
                  <option value="">Select a company</option>
                  {options}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  ref={submitBtn}
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Select
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booked;
