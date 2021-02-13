import React, { useState, useContext, Fragment } from "react";
import UserContext from "../context/users/userContext";
import Swal from "sweetalert2";
import uuid from "uuid/dist/v4";

const AddExpense = () => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const {
    dataSesion,
    hiddenBox,
    expenseToUpdate,
    updateAmmount,
    updateTransaction,
  } = userContext;
  //LOCAL STATES
  const [expense, addDataExpense] = useState({
    withdraw: "",
    type: "withdraw",
    date: "",
    destination: "",
    user: dataSesion.id,
  });
  const [errorAmmount, showErrorAmmount] = useState(false);
  const [errorType, showErrorType] = useState(false);
  const [errorDate, showErrorDate] = useState(false);

  const handleChange = (e) => {
    addDataExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };
  //SUBMIT
  let { withdraw, destination, date } = expense;
  const handleSubmit = (e) => {
    e.preventDefault();
    withdraw = parseInt(withdraw);
    if (!withdraw) {
      showErrorAmmount(true);
      setTimeout(() => {
        showErrorAmmount(false);
      }, 2000);
    }
    //IF UPDATE TRANSACTION
    if (expenseToUpdate) {
      expenseToUpdate.money = withdraw;
      if (expenseToUpdate.type === "add") {
        if (dataSesion.ammount + withdraw >= 0) {
          updateTransaction(expenseToUpdate);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your expense has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          addDataExpense({
            withdraw: "",
            type: "withdraw",
            date: "",
            user: dataSesion.id,
            destination: "",
          });
        } else {
          Swal.fire("YOU MUST DEPOSIT MORE MONEY");
        }
      } else {
        if (dataSesion.ammount - expenseToUpdate.money >= 0) {
          updateTransaction(expenseToUpdate);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your expense has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          addDataExpense({
            withdraw: "",
            type: "withdraw",
            date: "",
            user: dataSesion.id,
            destination: "",
          });
        } else {
          Swal.fire("YOUR EXPENSE IS GREATER THAN YOUR BUDGET");
        }
      }
    } else {
      //TO ADD TRANSACTION
      if (!destination) {
        showErrorType(true);
        setTimeout(() => {
          showErrorType(false);
        }, 2000);
        return;
      }
      if (!date) {
        showErrorDate(true);
        setTimeout(() => {
          showErrorDate(false);
        }, 2000);
        return;
      }
      expense.money = withdraw;
      delete expense.withdraw;
      if (dataSesion.ammount - expense.money >= 0) {
        expense.id_transaction = uuid();
        updateAmmount(expense);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have created a expense",
          showConfirmButton: false,
          timer: 1500,
        });
        addDataExpense({
          withdraw: "",
          type: "withdraw",
          date: "",
          user: dataSesion.id,
          destination: "",
        });
      } else {
        Swal.fire("YOU MUST DEPOSIT MORE MONEY");
        addDataExpense({
          withdraw: "",
          type: "withdraw",
          date: "",
          user: dataSesion.id,
          destination: "",
        });
      }
    }
  };

  return (
    <div className="column is-12-mobile is-6 has-background-black m-2">
      {hiddenBox === false ? (
        <p className="title is-2 has-text-white">ADD EXPENSES</p>
      ) : (
        <p className="title is-2 has-text-white">UPDATE AMMOUNT TRANSACTION</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="has-background-danger-light column p-5"
      >
        <div className="field">
          <p className="title is-3">Ammount</p>
          <div className="control">
            <input
              min={1}
              className="input is-large"
              type="number"
              name="withdraw"
              onChange={handleChange}
              value={withdraw}
            />
          </div>
          {errorAmmount ? (
            <p className="help is-danger">Please, enter ammount</p>
          ) : null}
        </div>
        {hiddenBox === false ? (
          <Fragment>
            <div className="field">
              <p className="title is-3">Expense type</p>
              <div className="control ">
                <div className="select is-medium">
                  <select onChange={handleChange} name="destination">
                    <option>Select </option>
                    <option value="workout">Workout</option>
                    <option value="transportation">Transportation</option>
                    <option value="family">Family</option>
                    <option value="gifts">Gifts</option>
                    <option value="education">Education</option>
                    <option value="home">Home</option>
                  </select>
                </div>
              </div>
              {errorType ? (
                <p className="help is-danger">Please, enter expense type</p>
              ) : null}
            </div>
            <div className="field">
              <p className="title is-3">Date</p>
              <div className="control">
                <input
                  type="date"
                  name="date"
                  className="input is-medium"
                  onChange={handleChange}
                  value={date}
                />
              </div>
              {errorDate ? (
                <p className="help is-danger">Please, enter date</p>
              ) : null}
            </div>
          </Fragment>
        ) : null}
        <div className="field is-grouped columns m-5 is-centered">
          <div className="control">
            <button type="submit" className="button is-danger">
              {hiddenBox === false ? "ADD EXPENSE +" : "UPDATE EXPENSE"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
