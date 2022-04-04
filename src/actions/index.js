import {
  SUBMIT_FORM,
  ADD_EXPENSE,
  REQUEST_API_COMPLETE,
  REQUEST_API_FAIL,
  REQUEST_API_COINS,
  DELETE_EXPENSE,
} from './actionTypes';

import cotacaoAPI from '../services/cotacaoAPI';

export const saveUser = (email) => ({ type: SUBMIT_FORM, email });

export const addExpense = (data, exchangeRates) => (
  { type: ADD_EXPENSE, data, exchangeRates });

// const requestApi = () => ({ type: REQUEST_API });

const requestApiComplete = (data) => ({ type: REQUEST_API_COMPLETE, data });

const requestApiFail = (error) => ({ type: REQUEST_API_FAIL, error });

const requestApiCoins = (coins) => ({ type: REQUEST_API_COINS, coins });

export const fetchAPI = () => (dispatch) => cotacaoAPI()
  .then(
    (data) => dispatch(requestApiComplete(data)),
    (error) => dispatch(requestApiFail(error)),
  );

export const fetchApiTwo = (data) => (dispatch) => cotacaoAPI()
  .then(
    (exchangeRates) => dispatch(addExpense(data, { exchangeRates })),
    (error) => dispatch(requestApiFail(error)),
  );

// ajuda do MATEUS TUROLA
export const getCoins = () => (dispatch) => (cotacaoAPI()
  .then((data) => Object.keys(data).filter((element) => element !== 'USDT'))
  .then((moedas) => dispatch(requestApiCoins(moedas)))
);
export const deleteExpense = (expenseId) => ({ type: DELETE_EXPENSE, expenseId });
