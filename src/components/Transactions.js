import React, { useContext } from "react";
import TransactionContext from "../context/transactions/transactionsContext";
import Swal from "sweetalert2";
const Transactions = () => {
  //CONTEXT
  const transactionContext = useContext(TransactionContext);
  const {
    transactions,
    catchTransaction,
    deleteTransaction,
  } = transactionContext;

  const toCatchTransaction = (data) => {
    Swal.fire({
      title: "Do you want update it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        catchTransaction(data);
      }
    });
  };

  const toDeleteTransaction = (transaction) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(transaction);
      }
    });
  };
  return (
    <div className="has-background-dark p-4 is-12-mobile is-7">
      <p className="title is-3 has-text-white">TRANSACTIONS</p>
      <table className="table">
        <thead className="has-background-primary-light">
          <tr>
            <th className="text-table">Type</th>
            <th className="text-table">N°</th>
            <th className="text-table">Amount</th>
            <th className="text-table">Date</th>
            <th className="text-table">Actions</th>
          </tr>
        </thead>
        {transactions
          ? transactions.map((transaction) => (
              <tbody
                key={transaction.id_transaction}
                className="has-background-danger-light borde"
              >
                <tr>
                  <td className="text-table">{transaction.type}</td>
                  <td className="text-table">{transaction.id_transaction} </td>
                  <td className="text-table">${transaction.ammount} </td>
                  <td className="text-table">{transaction.date}</td>
                  <td className="text-table">
                    {transaction.type !== "deposit" ? (
                      <button
                        onClick={() => toCatchTransaction(transaction)}
                        className="button is-small is-warning is-fullwidth m-1"
                      >
                        EDIT
                      </button>
                    ) : null}

                    <button
                      onClick={() => toDeleteTransaction(transaction)}
                      className="button is-small is-danger is-fullwidth m-1"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          : null}
      </table>
    </div>
  );
};

export default Transactions;
