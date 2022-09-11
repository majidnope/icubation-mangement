import { useState } from "react";
import { React, useContext, useEffect } from "react";
import Store from "../../../utils/userStore/ContextApi";
import { getDataFromDatabase } from "../../../utils/fetching";

function UserManage() {
  const app = useContext(Store);

  const [search, setSearch] = useState("");

  function remover(Id) {
    app.removeUsers(Id);
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/userRemove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: Id }),
    });
  }

  // updating usersData
  useEffect(() => {
    getDataFromDatabase().then((data) => {
      app.adminData(data.users, data.app);
    });
  }, []);
  //el.name.toLowerCase().includes(search.toLowerCase())
  let table = app.users.map((el, index) =>
    el.name.toLowerCase().includes(search.toLowerCase()) || search === "" ? (
      <tr key={index}>
        <td>
          <li></li>
        </td>
        <td>{el._id}</td>
        <td>{el.name}</td>
        <td>{el.username}</td>
        <td>
          <button
            className="btn btn-success btndelete"
            data-id={el._id}
            onClick={(e) => {
              remover(e.target.dataset.id);
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    ) : (
      ""
    )
  );

  return (
    <div className="left">
      <div className="box">
        <div className="table-responsive">
          <input
            className="form-control form-control-sm w-25 bg-dark text-light"
            style={{ border: "1px solid #2c3034", boxShadow: "none" }}
            type="text"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search for user....."
          />

          <table className="table table-dark table-striped mt-4">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Application Id</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManage;
