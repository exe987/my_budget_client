import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../context/users/userContext";
import uuid from "uuid/dist/v4";

const AddMoney = () => {
  //CONTEXT
  const userContext = useContext(UserContext);
  const { dataSesion, updateAmmount } = userContext;
  //LOCAL STATES
  const [moneyToAdd, addMoney] = useState({
    add: "",
    type: "add",
    dateA: "",
    user: dataSesion.id,
    destination: "deposit",
  });
  const [moneyToWithdraw, withdrawMoney] = useState({
    withdraw: "",
    type: "withdraw",
    dateW: "",
    user: dataSesion.id,
    destination: "withdrawal",
  });
  const [errorAdd, showErrorAdd] = useState(false);
  const [errorWithdraw, showErrorWithdraw] = useState(false);
  const [errorDate, showErrorDate] = useState(false);
  const [errorDateW, showErrorDateW] = useState(false);

  const handleChangeAdd = (e) => {
    addMoney({
      ...moneyToAdd,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeWithdraw = (e) => {
    withdrawMoney({
      ...moneyToWithdraw,
      [e.target.name]: e.target.value,
    });
  };
  let { add, dateA } = moneyToAdd;
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    if (!add) {
      showErrorAdd(true);
      setTimeout(() => {
        showErrorAdd(false);
      }, 2000);
      return;
    }
    if (!dateA) {
      showErrorDate(true);
      setTimeout(() => {
        showErrorDate(false);
      }, 2000);
      return;
    }
    add = parseInt(add);
    moneyToAdd.money = add;
    delete moneyToAdd.add;
    moneyToAdd.id_transaction = uuid();
    moneyToAdd.date = dateA;
    updateAmmount(moneyToAdd);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "You have deposited money",
      showConfirmButton: false,
      timer: 1500,
    });
    addMoney({
      add: "",
      type: "add",
      dateA: "",
      user: dataSesion.id,
      destination: "deposit",
    });
  };
  let { withdraw, dateW } = moneyToWithdraw;
  const handleSubmitWithdraw = (e) => {
    e.preventDefault();
    if (!withdraw) {
      showErrorWithdraw(true);
      setTimeout(() => {
        showErrorWithdraw(false);
      }, 2000);
      return;
    }
    if (!dateW) {
      showErrorDateW(true);
      setTimeout(() => {
        showErrorDateW(false);
      }, 2000);
      return;
    }
    withdraw = parseInt(withdraw);
    moneyToWithdraw.money = withdraw;
    delete moneyToWithdraw.withdraw;
    moneyToWithdraw.id_transaction = uuid();
    moneyToWithdraw.date = dateW;
    if (dataSesion.ammount - moneyToWithdraw.money >= 0) {
      updateAmmount(moneyToWithdraw);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have retired money",
        showConfirmButton: false,
        timer: 1500,
      });
      withdrawMoney({
        withdraw: "",
        type: "withdraw",
        date: "",
        user: dataSesion.id,
        destination: "withdrawal",
      });
    } else {
      Swal.fire("YOU MUST DEPOSIT MORE MONEY");
      withdrawMoney({
        withdraw: "",
        type: "withdraw",
        date: "",
        user: dataSesion.id,
        destination: "withdrawal",
      });
    }
  };
  return (
    <div className="has-background-black column is-12-mobile is-6 m-2 borde">
      <p className="title is-2 has-text-white">UPDATE BUDGET</p>
      <form
        onSubmit={handleSubmitAdd}
        className="has-background-primary-light column mt-5 p-5"
      >
        <div className="field">
          <p className="title is-3">Add money</p>
          <div className="control mt-2">
            <input
              className="input is-medium"
              type="number"
              name="add"
              min="1"
              value={add}
              onChange={handleChangeAdd}
            />
            {errorAdd ? (
              <p className="help is-danger">Please, enter amount to add</p>
            ) : null}
          </div>
        </div>
        <div className="field">
          <p className="title is-3">Date</p>
          <div className="control">
            <input
              type="date"
              name="dateA"
              className="input is-medium"
              onChange={handleChangeAdd}
            />
          </div>
          {errorDate ? (
            <p className="help is-danger">Please, enter date</p>
          ) : null}
        </div>
        <div className="field is-grouped columns m-5 is-centered">
          <div className="control">
            <button type="submit" className="button is-link ">
              ADD BUDGET
            </button>
          </div>
        </div>
      </form>
      <form
        onSubmit={handleSubmitWithdraw}
        className="has-background-danger-light column p-5"
      >
        <div className="field">
          <p className="title is-3">Withdraw money</p>
          <div className="control">
            <input
              className="input is-medium"
              type="number"
              name="withdraw"
              min="1"
              value={withdraw}
              onChange={handleChangeWithdraw}
            />
            {errorWithdraw ? (
              <p className="help is-danger">Please, enter amount to withdraw</p>
            ) : null}
          </div>
        </div>
        <div className="field">
          <p className="title is-3">Date</p>
          <div className="control">
            <input
              type="date"
              name="dateW"
              className="input is-medium"
              onChange={handleChangeWithdraw}
            />
          </div>
          {errorDateW ? (
            <p className="help is-danger">Please, enter date</p>
          ) : null}
        </div>
        <div className="field is-grouped columns m-5 is-centered">
          <div className="control">
            <button type="submit" className="button is-danger ">
              WITHDRAW MONEY
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMoney;
