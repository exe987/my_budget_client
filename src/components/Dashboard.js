import React, { useState, useContext } from "react";
import TransactionContext from "../context/transactions/transactionsContext";
import AddOrWithdrawMoney from "./AddOrWithdrawMoney";
import AddExpense from "./AddExpense";
import Transactions from './Transactions'

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
    <section className="section is-small">
      <div className="columns is-centered">
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
          <AddExpense formState={formState} changeForms={changeForms} />
        )}
      </div>
      <div className="columns is-centered mt-3">
        {hiddenBox === false ? <Transactions /> : null}
      </div>
    </section>
  );
};
export default Dashboard;
