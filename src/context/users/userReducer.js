import {
	CREATE_USER,
	USER_ALREADY_EXISTS,
	USER_CREATED,
	LOG_IN,
	LOG_OUT,
	ADD_TRANSACTION,
	UPDATE_AMMOUNT,
	UPDATE_TRANSACTION,
	DELETE_TRANSACTION
} from '../../types/index';

const userReducer = (state, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				users: [ ...state.users, action.payload ]
			};
		case LOG_IN:
			return {
				...state,
				sesion: true
			};
		case LOG_OUT:
			return {
				...state,
				sesion: false
			};
		case ADD_TRANSACTION:
			return {
				...state,
				transactions: [ ...state.transactions, action.payload ],
				hiddenBox: false
			};
		case UPDATE_AMMOUNT:
			return {
				...state,
				dataSesion: {
					ammount: state.dataSesion.ammount + action.payload
				}
			};
		case UPDATE_TRANSACTION:
			return {
				...state,
				hiddenBox: true
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter((transaction) => transaction.id_transaction !== action.payload)
			};
		default:
			return state;
	}
};

export default userReducer;
