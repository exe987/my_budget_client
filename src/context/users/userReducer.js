import {
  CREATE_USER,
  USER_ALREADY_EXISTS,
  USER_CREATED,
  LOG_IN,
  LOG_OUT,
  ADD_TRANSACTION,
  UPDATE_AMMOUNT,
  CATCH_TRANSACTION_TO_UPDATE,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "../../types/index";

const userReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case LOG_IN:
      return {
        ...state,
        sesion: true,
      };
    case LOG_OUT:
      return {
        ...state,
        sesion: false,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        expenses: [...state.transactions, action.payload].filter(
          (transaction) => transaction.type !== "add"
        ),
      };
    case UPDATE_AMMOUNT:
      return {
        ...state,
        dataSesion: {
          name: state.dataSesion.name,
          email: state.dataSesion.email,
          password: state.dataSesion.password,
          id: state.dataSesion.id,
          ammount: state.dataSesion.ammount + action.payload,
        },
      };
    case CATCH_TRANSACTION_TO_UPDATE:
      return {
        ...state,
        expenseToUpdate: action.payload,
        hiddenBox: true,
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((transaction) =>
          transaction.id_transaction === action.payload.id_transaction
            ? action.payload.id_transaction
            : transaction
        ),
        expenseToUpdate: null,
        hiddenBox: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) =>
            transaction.id_transaction !== action.payload.id_transaction
        ),
        expenses: state.transactions
          .filter(
            (transaction) =>
              transaction.id_transaction !== action.payload.id_transaction
          )
          .filter((transaction) => transaction.type !== "add"),
      };
    default:
      return state;
  }
};

export default userReducer;
