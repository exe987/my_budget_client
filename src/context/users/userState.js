import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";

import {
  CREATE_USER,
  USER_ALREADY_EXISTS,
  USER_CREATED,
  LOG_IN,
  LOG_OUT,
  ADD_TRANSACTION,
  CATCH_TRANSACTION_TO_UPDATE,
  UPDATE_TRANSACTION,
  UPDATE_AMMOUNT,
  DELETE_TRANSACTION,
} from "../../types/index";

const User = (props) => {
  const initialState = {
    users: [],
    sesion: false,
    dataSesion: {
      name: "Andrea",
      email: "perro@bu.com",
      password: "gomiel",
      id: 1,
      ammount: 0,
    },
    transactions: [],
    hiddenBox: false,
    expenseToUpdate: null,
  };
  //REDUCER
  const [state, dispatch] = useReducer(userReducer, initialState);
  //CREATE USER
  const createUser = (user) => {
    try {
      const { name, email, password } = user;
      //POST USER IN DATABASE
      if (user) {
        dispatch({
          type: CREATE_USER,
          payload: user,
        });
      } else {
        dispatch({
          type: USER_ALREADY_EXISTS,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //LOG IN
  const logIn = (user) => {
    try {
      //GET DATA FROM DATABASE - SET DATA IN PAYLOAD
      dispatch({
        type: LOG_IN,
      });
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
  //UPDATE AMMOUNT
  const updateAmmount = (transaction) => {
    try {
      dispatch({
        type: ADD_TRANSACTION,
        payload: transaction,
      });
      const { type, money } = transaction;
      if (type === "add") {
        dispatch({
          type: UPDATE_AMMOUNT,
          payload: money,
        });
      }
      if (type === "withdraw") {
        dispatch({
          type: UPDATE_AMMOUNT,
          payload: -money,
        });
      }
    } catch (error) {
      console.error();
    }
  };
  //UPDATE TRANSACTION
  const catchTransaction = (expense) => {
    try {
      dispatch({
        type: CATCH_TRANSACTION_TO_UPDATE,
        payload: expense,
      });
      const { type } = expense;
      if (type === "add") {
        dispatch({
          type: UPDATE_AMMOUNT,
          payload: -expense.money,
        });
      } else {
        dispatch({
          type: UPDATE_AMMOUNT,
          payload: expense.money,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateTransaction = (expense) => {
    try {
      dispatch({
        type: UPDATE_TRANSACTION,
        payload: expense,
      });
      const { type } = expense;
      if (type === "add") {
        dispatch({
          type: UPDATE_AMMOUNT,
          payload: expense.money,
        });
      } else {
        dispatch({
          type: UPDATE_AMMOUNT,
          payload: -expense.money,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE TRANSACTION
  const deleteTransaction = (transaction) => {
    try {
      dispatch({
        type: DELETE_TRANSACTION,
        payload: transaction,
      });
      dispatch({
        type: UPDATE_AMMOUNT,
        payload: transaction.money,
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
        transactions: state.transactions,
        hiddenBox: state.hiddenBox,
        expenseToUpdate: state.expenseToUpdate,
        createUser,
        logIn,
        logOut,
        updateAmmount,
        catchTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default User;
