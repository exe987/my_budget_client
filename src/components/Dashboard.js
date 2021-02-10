import React from 'react';
import AddMoney from './AddMoney';
import AddExpense from './AddExpense';
import Transactions from './Transactions';

const Dashboard = () => {
	return (
		<section className="section is-medium">
			<div className="columns">
				<AddMoney />
				<AddExpense />
			</div>
			<div className="columns is-centered mt-3">
				<Transactions />
			</div>
		</section>
	);
};
export default Dashboard;
