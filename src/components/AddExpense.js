import React, { useState, useContext, Fragment, useEffect } from "react";
import UserContext from "../context/users/userContext";
import TransactionContext from "../context/transactions/transactionsContext";
import AlertContext from "../context/alerts/alertContext";
import Swal from "sweetalert2";
import uuid from "uuid/dist/v4";

const AddExpense = ({ changeForms }) => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { dataSesion } = userContext;
  const transactionContext = useContext(TransactionContext);
  const {
    addTransaction,
    msgs,
    hiddenBox,
    updateTransaction,
    budget,
    expenseToUpdate,
  } = transactionContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  //LOCAL STATES
  const [money, addMoney] = useState({
    ammount: "",
    date: "",
    user: dataSesion.id,
    type: "",
  });
  //SHOW ERROR VALIDATOR
  useEffect(() => {
    if (msgs) {
      showAlert(msgs[0].msg);
    }
  }, [msgs]);

  const handleChange = (e) => {
    addMoney({
      ...money,
      [e.target.name]: e.target.value,
    });
  };
  //SUBMIT
  let { ammount, type, date } = money;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ammount) {
      showAlert("Type a ammount");
      return;
    }
    //IF UPDATE TRANSACTION
    if (expenseToUpdate) {
      //EXPENSES
      if ((budget - expenseToUpdate.ammount - ammount) < 0) {
        return;
      }
      expenseToUpdate.ammount = -ammount;
      updateTransaction(expenseToUpdate);
      addMoney({
        ammount: "",
        date: "",
        user: dataSesion.id,
        type: "",
      });
      
    } else {
      //TO ADD TRANSACTION
      if (!type) {
        showAlert("Choice a type");
        return;
      }
      if (!date) {
        showAlert("Choice a date");
        return;
      }
      if (budget < money.ammount) {
        showAlert("You don't have money");
        return;
      }
      money.ammount = parseInt(-ammount);
      addTransaction(money);
      addMoney({
        ammount: "",
        date: "",
        user: dataSesion.id,
        type: "",
      });
    }
  };

  return (
    <div className="has-background-dark column is-12-mobile is-7">
      {hiddenBox === false ? (
        <p className="title is-3 has-text-white">ADD EXPENSE</p>
      ) : (
        <p className="title is-3 has-text-white">UPDATE AMMOUNT EXPENSE</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="has-background-danger-light column p-6"
      >
        {alert ? (
          <p className="title has-text-white is-5 is-danger has-background-danger">
            {" "}
            {alert.toUpperCase()}{" "}
          </p>
        ) : null}

        <div className="field">
          <p className="title is-5">Ammount</p>
          <div className="control">
            <input
              min={1}
              className="input is-medium"
              type="number"
              name="ammount"
              onChange={handleChange}
              value={ammount}
            />
          </div>
        </div>
        {hiddenBox === false ? (
          <>
            <div className="field">
              <p className="title is-5">Expense type</p>
              <div className="control ">
                <div className="select is-small">
                  <select onChange={handleChange} name="type" value={type}>
                    <option>Select </option>
                    <option value="workout">Vacations</option>
                    <option value="transportation">Transportation</option>
                    <option value="family">Family</option>
                    <option value="gifts">Gifts</option>
                    <option value="education">Education</option>
                    <option value="home">Home</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="title is-5">Date</p>
              <div className="control">
                <input
                  type="date"
                  name="date"
                  className="input is-small"
                  onChange={handleChange}
                  value={date}
                />
              </div>
            </div>
          </>
        ) : null}
        <div className="field is-grouped columns m-5 is-centered">
          <div className="control">
            <button type="submit" className="button is-danger">
              {hiddenBox === false ? "ADD EXPENSE +" : "UPDATE EXPENSE"}
            </button>
          </div>
        </div>
      </form>
      <a className="tag is-warning ml-2 mt-2" onClick={() => changeForms()}>
        Do yo want to update budget?
      </a>
    </div>
  );
};

export default AddExpense;
