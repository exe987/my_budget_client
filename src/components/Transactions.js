import React, { useContext } from "react";
import TransactionContext from "../context/transactions/transactionsContext";
import Swal from "sweetalert2";
const Transactions = () => {
  //CONTEXT
  const transactionContext = useContext(TransactionContext);
  const {
    budget,
    transactions,
    catchTransaction,
    deleteTransaction,
  } = transactionContext;

  //CATCH TRANSACTION FOR UPDATING
  const toCatchTransaction = (data) => {
    catchTransaction(data);
  };
  //DELETE TRANSACTION
  const toDeleteTransaction = (transaction) => {
    if (budget - transaction.ammount < 0) {
      Swal.fire({
        text: "Budget cannot be less than 0!",
        icon: "warning",
      });
      return;
    }
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
    <div className="has-background-dark column m-2 is-mobile-12 is-7">
      <p className="title is-4 has-text-white has-text-centered">
        LAST 10 TRANSACTIONS
      </p>
      <div className="columns is-centered p-4">
        <table className="table is-fullwidth">
          <thead className="has-background-primary-light">
            <tr>
              <th className="text-table">Type</th>
              <th className="text-table">N°</th>
              <th className="text-table">Ammount</th>
              <th className="text-table">Date</th>
              <th className="text-table">Action</th>
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
                    <td className="text-table">
                      {transaction.id_transaction}{" "}
                    </td>
                    <td className="text-table">${transaction.ammount} </td>
                    <td className="text-table">{transaction.date}</td>
                    <td className="text-table">
                      <button
                        onClick={() => toCatchTransaction(transaction)}
                        className="button is-small is-warning m-1"
                      >
                        EDIT
                      </button>

                      <button
                        onClick={() => toDeleteTransaction(transaction)}
                        className="button is-small is-danger m-1"
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
    </div>
  );
};

export default Transactions;
