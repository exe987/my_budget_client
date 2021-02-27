import {
  CREATE_USER,
  ERROR_CREATE_USER,
  LOG_IN,
  LOG_IN_ERROR,
  LOG_OUT,
  GET_DATA_USER,
} from "../../types/index";

const userReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
      };
    case ERROR_CREATE_USER:
      return {
        ...state,
        msgs: action.payload,
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        msgs: action.payload,
      };
    case LOG_IN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
      };
    case GET_DATA_USER:
      return {
        ...state,
        dataSesion: action.payload,
        sesion: true,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        sesion: false,
        dataSesion: null,
        token: null,
      };

    default:
      return state;
  }
};

export default userReducer;
