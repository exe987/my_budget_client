import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../context/users/userContext';

const AddMoney = () => {
	//CONTEXT
	const userContext = useContext(UserContext);
	const { dataSesion, updateAmmount } = userContext;
	//LOCAL STATES
	const [ moneyToAdd, addMoney ] = useState({
		add: '',
		type: 'add',
		dateA: '',
		user: dataSesion.id,
		destination: 'deposit'
	});
	const [ moneyToWithdraw, withdrawMoney ] = useState({
		withdraw: '',
		type: 'withdraw',
		dateW: '',
		user: dataSesion.id,
		destination: 'withdrawal'
	});
	const [ errorAdd, showErrorAdd ] = useState(false);
	const [ errorWithdraw, showErrorWithdraw ] = useState(false);
	const [ errorDate, showErrorDate ] = useState(false);
	const [ errorDateW, showErrorDateW ] = useState(false);

	const handleChangeAdd = (e) => {
		addMoney({
			...moneyToAdd,
			[e.target.name]: e.target.value
		});
	};
	const handleChangeWithdraw = (e) => {
		withdrawMoney({
			...moneyToWithdraw,
			[e.target.name]: e.target.value
		});
	};
	let { add, dateA } = moneyToAdd;
	let { withdraw, dateW } = moneyToWithdraw;
	const handleSubmitAdd = (e) => {
		e.preventDefault();
		if (!add) {
			showErrorAdd(true);
			setTimeout(() => {
				showErrorAdd(false);
			}, 2000);
			return;
		}
		if (!dateA) {
			showErrorDate(true);
			setTimeout(() => {
				showErrorDate(false);
			}, 2000);
			return;
		}
		add = parseInt(add);
		moneyToAdd.money = add;
		delete moneyToAdd.add;
		moneyToAdd.date = dateA;
		delete moneyToAdd.dateA;
		updateAmmount(moneyToAdd);
		addMoney({
			add: '',
			type: 'add',
			dateA: '',
			user: dataSesion.id,
			destination: 'deposit'
		});
	};
	const handleSubmitWithdraw = (e) => {
		e.preventDefault();
		if (!withdraw) {
			showErrorWithdraw(true);
			setTimeout(() => {
				showErrorWithdraw(false);
			}, 2000);
			return;
		}
		if (!dateW) {
			showErrorDateW(true);
			setTimeout(() => {
				showErrorDateW(false);
			}, 2000);
			return;
		}
		withdraw = parseInt(withdraw);
		moneyToWithdraw.money = withdraw;
		delete moneyToWithdraw.withdraw;
		moneyToWithdraw.date = dateW;
		delete moneyToWithdraw.dateW;
		if (dataSesion.ammount - moneyToWithdraw.money >= 0) {
			updateAmmount(moneyToWithdraw);
			withdrawMoney({
				withdraw: '',
				type: 'withdraw',
				date: '',
				user: dataSesion.id,
				destination: 'withdrawal'
			});
		} else {
			Swal.fire('YOU MUST DEPOSIT MORE MONEY');
			withdrawMoney({
				withdraw: '',
				type: 'withdraw',
				date: '',
				user: dataSesion.id,
				destination: 'withdrawal'
			});
		}
	};
	return (
		<div className="column is-12-mobile is-6 has-background-primary-light m-2">
			<p className="title is-2">UPDATE BUDGET</p>
			<form onSubmit={handleSubmitAdd} className="column mt-5 p-5">
				<div className="field">
					<p className="title is-3">Add money</p>
					<div className="control mt-2">
						<input
							className="input is-large"
							type="number"
							name="add"
							min="1"
							value={add}
							onChange={handleChangeAdd}
						/>
						{errorAdd ? <p className="help is-danger">Please, enter amount to add</p> : null}
					</div>
				</div>
				<div className="field">
					<p className="title is-3">Date</p>
					<div className="control">
						<input
							type="date"
							name="dateA"
							className="input is-medium"
							onChange={handleChangeAdd}
							value={dateA}
						/>
					</div>
					{errorDate ? <p className="help is-danger">Please, enter date</p> : null}
				</div>
				<div className="field is-grouped columns m-5 is-centered">
					<div className="control">
						<button type="submit" className="button is-link ">
							ADD BUDGET
						</button>
					</div>
				</div>
			</form>
			<form onSubmit={handleSubmitWithdraw} className="column p-5">
				<div className="field">
					<p className="title is-3">Withdraw money</p>
					<div className="control mt-4">
						<input
							className="input is-large"
							type="number"
							name="withdraw"
							min="1"
							value={withdraw}
							onChange={handleChangeWithdraw}
						/>
						{errorWithdraw ? <p className="help is-danger">Please, enter amount to withdraw</p> : null}
					</div>
				</div>
				<div className="field">
					<p className="title is-3">Date</p>
					<div className="control">
						<input
							type="date"
							name="dateW"
							className="input is-medium"
							onChange={handleChangeWithdraw}
							value={dateW}
						/>
					</div>
					{errorDateW ? <p className="help is-danger">Please, enter date</p> : null}
				</div>
				<div className="field is-grouped columns m-5 is-centered">
					<div className="control">
						<button type="submit" className="button is-danger ">
							WITHDRAW MONEY
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddMoney;
