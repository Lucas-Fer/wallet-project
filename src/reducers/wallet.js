import {
  ADD_EXPENSE, REQUEST_API_COMPLETE, REQUEST_API_COINS, DELETE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length, ...action.data, ...action.exchangeRates,
      }],
    };
  case REQUEST_API_COMPLETE:
    return { ...state, expenses: [...state.expenses], apiData: action.data };
  case REQUEST_API_COINS:
    return { ...state, currencies: action.coins };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.expenseId),
    };
  default:
    return state;
  }
};

export default wallet;

// { ...state, expenses: [...state.expenses], exchangeRates: action.data };
