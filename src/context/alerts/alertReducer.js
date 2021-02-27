import { SHOW_ALERT, HIDDEN_ALERT } from "../../types/index";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        alert: action.payload,
      };
    case HIDDEN_ALERT:
      return {
        alerta: null,
      };
    default:
      return state;
  }
};

export default alertReducer;
