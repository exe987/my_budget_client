import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import UserContext from "../context/users/userContext";
import TransactionContext from "../context/transactions/transactionsContext";
import AlertContext from "../context/alerts/alertContext";

const WithdrawMoney = () => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { dataSesion } = userContext;
  const transactionContext = useContext(TransactionContext);
  const { addTransaction, msgs, budget } = transactionContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  //LOCAL STATES
  const [money, addMoney] = useState({
    ammount: "",
    date: "",
    user: dataSesion.id,
    type: "withdraw",
  });
  //SHOW ERROR VALIDATOR
  useEffect(() => {
    if (msgs) {
      showAlert(msgs[0].msg);
    }
  }, [msgs]);

  const handleChangeWithdraw = (e) => {
    addMoney({
      ...money,
      [e.target.name]: e.target.value,
    });
  };
  //SUBMIT DATA
  let { ammount, date } = money;
  const handleSubmitWithdraw = (e) => {
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
    if (budget < ammount) {
      showAlert("You don't have money");
      return;
    }
    money.ammount = parseInt(-ammount);
    addTransaction(money);
    //REINIT FROM
    addMoney({
      ammount: "",
      date: "",
      user: dataSesion.id,
      type: "withdraw",
    });
  };
  return (
    <form
      onSubmit={handleSubmitWithdraw}
      className="has-background-danger-light column p-6"
    >
      {alert ? (
        <p className="title has-text-white is-5 is-danger has-background-danger">
          {" "}
          {alert.toUpperCase()}{" "}
        </p>
      ) : null}
      <div className="field">
        <p className="title is-3">TO WITHDRAW</p>
      </div>
      <div className="field">
        <p className="title is-5">Ammount</p>
        <div className="control">
          <input
            className="input is-medium"
            type="number"
            name="ammount"
            min="1"
            value={ammount}
            onChange={handleChangeWithdraw}
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
            onChange={handleChangeWithdraw}
            value={date}
          />
        </div>
      </div>
      <div className="field is-grouped columns m-5 is-centered">
        <div className="control">
          <button type="submit" className="button is-danger ">
            WITHDRAW
          </button>
        </div>
      </div>
    </form>
  );
};

export default WithdrawMoney;
