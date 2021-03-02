import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/users/userContext";
import TransactionContext from "../context/transactions/transactionsContext";
import AlertContext from "../context/alerts/alertContext";

const AddAndUpdateExpense = ({ changeForms }) => {
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
    cancelCatchTransaction,
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

  //TO CANCEL SELECT TRANSACTION
  const toCancelCatchTransaction = () => {
    cancelCatchTransaction();
    addMoney({
      ammount: "",
      date: "",
      user: dataSesion.id,
      type: "",
    });
  };

  //SUBMIT DATA
  let { ammount, type, date } = money;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ammount) {
      showAlert("Type a ammount");
      return;
    }
    ammount = parseInt(ammount);
    //IF UPDATE TRANSACTION
    if (expenseToUpdate) {
      //DEPOSITS
      if (expenseToUpdate.type === "deposit") {
        if (budget - expenseToUpdate.ammount + ammount < 0) {
          showAlert("Budget cannot be less than 0");
          return;
        }
        expenseToUpdate.ammount = ammount;
        updateTransaction(expenseToUpdate);
        addMoney({
          ammount: "",
          date: "",
          user: dataSesion.id,
          type: "",
        });
      } else {
        //WITHDRAWS
        if (budget - expenseToUpdate.ammount - ammount < 0) {
          showAlert("Budget cannot be less than 0");
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
      }
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
    <div className="has-background-dark m-2 column">
      {hiddenBox === false ? (
        <p className="title is-4 has-text-white has-text-centered">
          ADD EXPENSE
        </p>
      ) : (
        <p className="title is-4 has-text-white has-text-centered">
          UPDATE TRANSACTION
        </p>
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
                    <option value="">Select </option>
                    <option value="workout">Vacations</option>
                    <option value="transport">Transport</option>
                    <option value="family">Family</option>
                    <option value="gifts">Gifts</option>
                    <option value="education">Education</option>
                    <option value="food">Food</option>
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
              {hiddenBox === false ? "ADD EXPENSE +" : "UPDATE TRANSACTION"}
            </button>
          </div>
        </div>
      </form>
      {hiddenBox === false ? (
        <a className="tag is-warning ml-2 mt-2" onClick={() => changeForms()}>
          UPDATE BUDGET
        </a>
      ) : (
        <a
          className="tag is-warning ml-2 mt-2"
          onClick={() => toCancelCatchTransaction()}
        >
          CANCEL UPDATE BUDGET
        </a>
      )}
    </div>
  );
};

export default AddAndUpdateExpense;
