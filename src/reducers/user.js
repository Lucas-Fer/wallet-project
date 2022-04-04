import { SUBMIT_FORM } from '../actions/actionTypes';

const INITIAL_STATE_USER = {
  email: '',
};

const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case SUBMIT_FORM:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
