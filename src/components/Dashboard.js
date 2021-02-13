import React, { useContext } from 'react';
import UserContext from '../context/users/userContext';
import AddMoney from './AddMoney';
import AddExpense from './AddExpense';
import Transactions from './Transactions';

const Dashboard = () => {
	//CONTEXT
	const userContext = useContext(UserContext);
	const { hiddenBox } = userContext;
	return (
		<section className="section is-medium">
			<div className="columns is-vcentered">
				{hiddenBox === false ? <AddMoney /> : null}
				<AddExpense />
			</div>
			<div className="columns is-centered mt-3">{hiddenBox === false ? <Transactions /> : null}</div>
		</section>
	);
};
export default Dashboard;
