import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';

import {
	CREATE_USER,
	USER_ALREADY_EXISTS,
	USER_CREATED,
	LOG_IN,
	LOG_OUT,
	ADD_TRANSACTION,
	UPDATE_TRANSACTION,
	UPDATE_AMMOUNT,
	DELETE_TRANSACTION
} from '../../types/index';

const User = (props) => {
	const initialState = {
		users: [],
		sesion: true,
		dataSesion: {
			name: 'Andrea',
			email: 'perro@bu.com',
			password: 'gomiel',
			id: 1,
			ammount: 0
		},
		transactions: [
			{
				type: 'withdraw',
				destination: 'withdrawal',
				money: 150,
				id: 1,
				date: '51-21-1223',
				id_transaction: 1560305615600
			},
			{
				type: 'add',
				destination: 'deposit',
				money: 150,
				id: 1,
				date: '51-21-1223',
				id_transaction: 15603056
			},
			{
				type: 'add',
				destination: 'deposit',
				money: 150,
				id: 1,
				date: '51-21-1223',
				id_transaction: 15603455056
			}
		],
		hiddenBox: false
	};

	//REDUCER
	const [ state, dispatch ] = useReducer(userReducer, initialState);

	//CREATE USER
	const createUser = (user) => {
		try {
			const { name, email, password } = user;
			//POST USER IN DATABASE

			if (user) {
				dispatch({
					type: CREATE_USER,
					payload: user
				});
			} else {
				dispatch({
					type: USER_ALREADY_EXISTS
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	//LOG IN
	const logIn = (user) => {
		try {
			//GET DATA FROM DATABASE - SET DATA IN PAYLOAD
			dispatch({
				type: LOG_IN
			});
		} catch (error) {
			console.log(error);
		}
	};
	//LOG OUT
	const logOut = () => {
		try {
			dispatch({
				type: LOG_OUT
			});
		} catch (error) {
			console.log(error);
		}
	};
	//UPDATE AMMOUNT
	const updateAmmount = (transaction) => {
		try {
			console.log(transaction);
			dispatch({
				type: ADD_TRANSACTION,
				payload: transaction
			});
			const { type, money, date, user, destination } = transaction;
			if (type === 'add') {
				dispatch({
					type: UPDATE_AMMOUNT,
					payload: money
				});
			}
			if (type === 'withdraw') {
				dispatch({
					type: UPDATE_AMMOUNT,
					payload: -money
				});
			}
		} catch (error) {
			console.error();
		}
	};
	//UPDATE TRANSACTION
	const updateTransaction = (expense) => {
		console.log(expense);
		try {
			dispatch({
				type: UPDATE_TRANSACTION,
				payload: expense
			});
		} catch (error) {
			console.log(error);
		}
	};
	//DELETE TRANSACTION
	const deleteTransaction = (id) => {
		try {
			dispatch({
				type: DELETE_TRANSACTION,
				payload: id
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<UserContext.Provider
			value={{
				sesion: state.sesion,
				dataSesion: state.dataSesion,
				transactions: state.transactions,
				hiddenBox: state.hiddenBox,
				createUser,
				logIn,
				logOut,
				updateAmmount,
				updateTransaction,
				deleteTransaction
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default User;
