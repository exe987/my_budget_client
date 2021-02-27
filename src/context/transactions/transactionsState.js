import React, { useReducer } from "react";
import TransactionContext from "./transactionsContext";
import transactionReducer from "./transactionsReducer";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_ERROR,
  GET_TRANSACTIONS,
  CATCH_TRANSACTION_TO_UPDATE,
  UPDATE_TRANSACTION,
  UPDATE_AMMOUNT,
  DELETE_TRANSACTION,
} from "../../types/index";
const Transaction = (props) => {
  const initialState = {
    transactions: null,
    budget: null,
    hiddenBox: false,
    expenseToUpdate: null,
    msgs: null,
  };
  //REDUCER
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  //ADD TRANSACTION
  const addTransaction = async (transaction) => {
    try {
      const response = await clienteAxios.post("/api/transaction", transaction);
      dispatch({
        type: ADD_TRANSACTION,
      });
      //MSG SUCCESS
      Swal.fire({
        icon: "success",
        title: response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      //GET LAST 10 TRANSACTIONS
      getLastTransactions(transaction.user);
      //GET BUDGET TRANSACTIONS AND UPDATE BUDGET USERS
      getBudget(transaction.user);
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_TRANSACTION_ERROR,
        payload: error.response.data.errors,
      });
    }
  };
  //GET LAST 10 TRANSACTIONS
  const getLastTransactions = async (id_user) => {
    try {
      const response = await clienteAxios.get("/api/transaction", {
        params: { id: id_user },
      });
      dispatch({
        type: GET_TRANSACTIONS,
        payload: response.data.result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //GET BUDGET TRANSACTIONS AND UPDATE BUDGET USERS
  const getBudget = async (id) => {
    try {
      const response = await clienteAxios.get("/api/transaction/sum", {
        params: { id: id },
      });
      const { budget } = response.data.result[0];
      dispatch({
        type: UPDATE_AMMOUNT,
        payload: budget,
      });
      await clienteAxios.put("/api/user/ammount", {
        id: id,
        ammount: budget,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //UPDATE TRANSACTION
  //CATCH TRANSACTION FOR UPDATING
  const catchTransaction = (expense) => {
    try {
      dispatch({
        type: CATCH_TRANSACTION_TO_UPDATE,
        payload: expense,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //UPDATE TRANSACTION
  const updateTransaction = async (transaction) => {
    try {
      const response = await clienteAxios.put("/api/transaction", {
        id: transaction.id_transaction,
        ammount: transaction.ammount,
      });
      console.log(response);
      //GET LAST 10 TRANSACTIONS
      getLastTransactions(transaction.id);
      //GET BUDGET
      getBudget(transaction.id);
      dispatch({
        type: UPDATE_TRANSACTION,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE TRANSACTION
  const deleteTransaction = async (transaction) => {
    try {
      const { id_transaction } = transaction;
      await clienteAxios.delete(`/api/transaction/${id_transaction}`, {
        params: {
          id_transaction: id_transaction,
        },
      });
      //GET LAST 10 TRANSACTIONS
      getLastTransactions(transaction.id);
      //GET BUDGET
      getBudget(transaction.id);
      dispatch({
        type: DELETE_TRANSACTION,
      });
      Swal.fire("Deleted!", "Your expense has been deleted.", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        hiddenBox: state.hiddenBox,
        expenseToUpdate: state.expenseToUpdate,
        msgs: state.msgs,
        budget: state.budget,
        addTransaction,
        getLastTransactions,
        getBudget,
        catchTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default Transaction;
