import React, { useState, useContext } from "react";
import TransactionContext from "../context/transactions/transactionsContext";
import AddOrWithdrawMoney from "./AddOrWithdrawMoney";
import AddAndUpdateExpense from "./AddAndUpdateExpense";
import Transactions from "./Transactions";

const Dashboard = () => {
  //CONTEXT
  const transactionContext = useContext(TransactionContext);
  const { hiddenBox } = transactionContext;

  //CHANGE FORM TYPE
  const [formState, stateForm] = useState(false);
  const changeForms = () => {
    if (formState) {
      stateForm(false);
    } else {
      stateForm(true);
    }
  };

  return (
    <section className="section columns is-vcentered mt-6">
      {formState ? (
        <>
          {hiddenBox === false ? (
            <>
              <AddOrWithdrawMoney
                formState={formState}
                changeForms={changeForms}
              />
            </>
          ) : null}
        </>
      ) : (
        <AddAndUpdateExpense formState={formState} changeForms={changeForms} />
      )}

      {hiddenBox === false ? <Transactions /> : null}
    </section>
  );
};
export default Dashboard;
