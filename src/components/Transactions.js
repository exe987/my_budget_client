import React, { useState, useContext } from 'react';
import UserContext from '../context/users/userContext';
import Swal from 'sweetalert2';
const Transactions = () => {
	//CONTEXT
	const userContext = useContext(UserContext);
	const { dataSesion, transactions, updateTransaction, deleteTransaction } = userContext;

	const toUpdateTransaction = (data) => {
		Swal.fire({
			title: 'Do you want update it?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, update it!'
		}).then((result) => {
			if (result.isConfirmed) {
				updateTransaction(data);
			}
		});
	};
	const toDeleteTransaction = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				deleteTransaction(id);
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
			}
		});
	};
	return (
		<div className="column is-12-mobile is-7 has-background-info-light m-2">
			<p className="title is-3">Transactions</p>
			<table className="table">
				<thead className="has-background-primary-light">
					<tr>
						<th>
							<abbr>Type</abbr>
						</th>
						<th>
							<abbr>Id</abbr>
						</th>
						<th>
							<abbr>Amount</abbr>
						</th>
						<th>
							<abbr>Date</abbr>
						</th>
						<th>
							<abbr>Actions</abbr>
						</th>
					</tr>
				</thead>
				{transactions.map((transaction) => (
					<tbody key={transaction.id_transaction} className="has-background-danger-light">
						<tr>
							<th>{transaction.destination}</th>
							<td> {transaction.id_transaction} </td>
							<td> {transaction.money} </td>
							<td>23-11-1991</td>
							<td>
								<button
									onClick={() => toUpdateTransaction(transaction)}
									className="button is-small is-warning is-fullwidth m-1"
								>
									EDIT
								</button>
								<button
									onClick={() => toDeleteTransaction(transaction.id_transaction)}
									className="button is-small is-danger is-fullwidth m-1"
								>
									DELETE
								</button>
							</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default Transactions;
