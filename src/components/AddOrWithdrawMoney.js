import React, { useState } from "react";
import AddMoney from "./AddMoney";
import WithdrawMoney from "./WithdrawMoney";
const AddOrWithdrawMoney = ({ changeForms }) => {
  //CHANGE FORM TYPE
  const [form, changeForm] = useState(false);
  const showForm = () => {
    if (form) {
      changeForm(false);
    } else {
      changeForm(true);
    }
  };
  return (
    <div className="has-background-dark column is-mobile-12 m-2 is-5">
      <p className="title has-text-white has-text-centered is-4">
        UPDATE YOUR BUDGET
      </p>
      {form ? (
        <>
          <WithdrawMoney />
          <a className="tag is-warning mt-2" onClick={() => showForm()}>
            DEPOSIT
          </a>
        </>
      ) : (
        <>
          <AddMoney />
          <a className="tag is-warning mt-2" onClick={() => showForm()}>
            WITHDRAW
          </a>
        </>
      )}
      <a className="tag is-warning ml-2 mt-2" onClick={() => changeForms()}>
        ADD EXPENSE
      </a>
    </div>
  );
};

export default AddOrWithdrawMoney;
