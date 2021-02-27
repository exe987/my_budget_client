import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import tokenAuth from "../../config/tokenAuth";
import { useHistory } from "react-router-dom";
import {
  CREATE_USER,
  ERROR_CREATE_USER,
  LOG_IN,
  LOG_IN_ERROR,
  GET_DATA_USER,
  LOG_OUT,
} from "../../types/index";

const User = (props) => {
  const initialState = {
    msgs: null,
    sesion: false,
    dataSesion: null,
    hiddenBox: false,
    expenseToUpdate: null,
  };
  const history = useHistory();
  //REDUCER
  const [state, dispatch] = useReducer(userReducer, initialState);
  //CREATE USER
  const createUser = async (user) => {
    try {
      user.ammount = 0;
      const response = await clienteAxios.post("/api/createuser", user);
      dispatch({
        type: CREATE_USER,
      });
      Swal.fire({
        icon: "success",
        title: response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_CREATE_USER,
        payload: error.response.data.errors,
      });
    }
  };
  //LOGIN
  const logIn = async (user) => {
    try {
      const response = await clienteAxios.post("/api/login", user);
      dispatch({
        type: LOG_IN,
        payload: response.data.token,
      });
      authenticatedUser();
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOG_IN_ERROR,
        payload: error.response.data.errors,
      });
    }
  };
  //USER AUTHENTICATED
  const authenticatedUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        tokenAuth(token);
        const response = await clienteAxios.get("/api/login");
        dispatch({
          type: GET_DATA_USER,
          payload: response.data.result[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //LOG OUT
  const logOut = () => {
    try {
      dispatch({
        type: LOG_OUT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        sesion: state.sesion,
        dataSesion: state.dataSesion,
        msgs: state.msgs,
        createUser,
        logIn,
        authenticatedUser,
        logOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default User;
