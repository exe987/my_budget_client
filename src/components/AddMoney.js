import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/users/userContext";
import TransactionContext from "../context/transactions/transactionsContext";
import AlertContext from "../context/alerts/alertContext";

const AddMoney = () => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { dataSesion } = userContext;
  const transactionContext = useContext(TransactionContext);
  const { addTransaction, msgs } = transactionContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  //LOCAL STATES
  const [money, addMoney] = useState({
    ammount: "",
    date: "",
    user: dataSesion.id,
    type: "deposit",
  });
  //SHOW ERROR VALIDATOR
  useEffect(() => {
    if (msgs) {
      showAlert(msgs[0].msg);
    }
  }, [msgs]);

  const handleChangeAdd = (e) => {
    addMoney({
      ...money,
      [e.target.name]: e.target.value,
    });
  };
  let { ammount, date } = money;
  const handleSubmitAdd = (e) => {
    //VALIDATE CAMPS
    e.preventDefault();
    if (!ammount) {
      showAlert("Type a ammount");
      return;
    }
    if (!date) {
      showAlert("Choice a date");
      return;
    }
    //ADD TRANSACTION
    money.ammount = parseInt(ammount);
    addTransaction(money);
    //REINIT FORM
    addMoney({
      ammount: "",
      date: "",
      user: dataSesion.id,
      type: "deposit",
    });
  };

  return (
    <form
      onSubmit={handleSubmitAdd}
      className="has-background-primary-light column p-6"
    >
      {alert ? (
        <p className="title has-text-white is-5 is-danger has-background-danger">
          {" "}
          {alert.toUpperCase()}{" "}
        </p>
      ) : null}
      <div className="field">
        <p className="title is-3">TO DEPOSIT</p>
      </div>
      <div className="field">
        <p className="title is-5">Ammount</p>
        <div className="control mt-2">
          <input
            className="input is-medium"
            type="number"
            name="ammount"
            min="1"
            value={ammount}
            onChange={handleChangeAdd}
          />
        </div>
      </div>
      <div className="field">
        <p className="title is-5">Date</p>
        <div className="control">
          <input
            type="date"
            name="date"
            className="input is-medium"
            onChange={handleChangeAdd}
            value={date}
          />
        </div>
      </div>
      <div className="field is-grouped columns m-5 is-centered">
        <div className="control">
          <button type="submit" className="button is-link ">
            DEPOSIT
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddMoney;
