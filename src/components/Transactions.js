import React from 'react';

const Transactions = () => {
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
				<tbody className="has-background-danger-light">
					<tr>
						<th>Food</th>
						<td>1</td>
						<td>$38</td>
						<td>23-11-1991</td>
						<td>
							<button className="button is-small is-warning is-fullwidth m-1">EDIT</button>
							<button className="button is-small is-danger is-fullwidth m-1">DELETE</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Transactions;
