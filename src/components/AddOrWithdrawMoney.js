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
    <div className="has-background-dark column is-12-mobile is-7">
      <p className="title has-text-white is-3">UPDATE YOUR BUDGET</p>
      {form ? (
        <>
          <WithdrawMoney />
          <a
            className="tag is-warning mt-2"
            onClick={() => showForm()}
          >
            Do yo want to deposit?
          </a>
        </>
      ) : (
        <>
          <AddMoney />
          <a
            className="tag is-warning mt-2"
            onClick={() => showForm()}
          >
            Do yo want to withdraw?
          </a>
        </>
      )}
      <a
        className="tag is-warning ml-2 mt-2"
        onClick={() => changeForms()}
      >
        Do yo want to add expense?
      </a>
    </div>
  );
};

export default AddOrWithdrawMoney;
