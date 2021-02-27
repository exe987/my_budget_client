import {
  ADD_TRANSACTION,
  ADD_TRANSACTION_ERROR,
  GET_TRANSACTIONS,
  UPDATE_AMMOUNT,
  CATCH_TRANSACTION_TO_UPDATE,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "../../types/index";

const transactionReducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
      };
    case ADD_TRANSACTION_ERROR:
      return {
        ...state,
        msgs: action.payload,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case UPDATE_AMMOUNT:
      return {
        ...state,
        budget: action.payload,
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
        expenseToUpdate: null,
        hiddenBox: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default transactionReducer;
