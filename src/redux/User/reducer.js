import { combineReducers } from "redux";

const INITIAL_STATE = {};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_USER_INFO":
      const newState = action.user;
      return newState;

    default:
      return state;
  }
};

export default combineReducers({
  user: UserReducer,
});
