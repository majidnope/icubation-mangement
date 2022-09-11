import { useReducer } from "react";
import Store from "./ContextApi";

let initialState = {
  userData: "",
  app_data: [],
  usersData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { userData: { ...action.userData } };
    case "delete":
      return { userData: action.userData };
    case "addApplication":
      return { app_data: [...action.app_data] };
    case "addUsers":
      return { usersData: [...action.usersData] };
    case "addData":
      return { usersData: action.users, app_data: action.app_data };

    default:
      break;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (value) => {
    dispatch({
      type: "add",
      userData: value,
    });
  };
  const remove = () => {
    dispatch({
      type: "delete",
      userData: "",
    });
  };
  const setApplication = (array) => {
    dispatch({
      type: "addApplication",
      app_data: array,
    });
  };

  const setUsersData = (array) => {
    dispatch({
      type: "addUsers",
      usersData: array,
    });
  };
  const removeUsers = (id) => {
    console.log(id);

    dispatch({
      type: "addUsers",
      usersData: state.usersData.filter((el) => !(id === el._id)),
    });
  };
  const adminData = (users,applications) => {
    dispatch({ type: "addData", users: users, app_data: applications });
  };

  const value = {
    user: state.userData,
    users: state.usersData ? state.usersData : [],
    app_data: state.app_data ? state.app_data : [],
    loginState: state.userData ? true : false,
    newAppCount: (() => {
      let count = state.app_data
        ? state.app_data.filter((el) => el.status === "new")
        : [];
      return count.length;
    })(),
    add,
    remove,
    removeUsers,
    setApplication,
    setUsersData,
    adminData
  };
  

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

//contextApI with reducer

export default StoreProvider;
