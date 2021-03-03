import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { SHOW_ALERT, HIDDEN_ALERT } from "../../types/index";

const Alert = (props) => {
  const initialState = {
    alert: null,
  };
  //REDUCER
  const [state, dispatch] = useReducer(alertReducer, initialState);
  //SHOW ALERT
  const showAlert = (msg) => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg,
    });
    //HIDDEN ALERT
    setTimeout(() => {
      dispatch({
        type: HIDDEN_ALERT,
      });
    }, 4000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default Alert;
