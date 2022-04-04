import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class TableExpenses extends Component {
  render() {
    const { props: { expenses, removeExpense } } = this;

    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((element) => (
            <tr key={ element.id }>
              <th>{element.id}</th>
              <td>{element.value}</td>
              <td>{element.description}</td>
              <td>{element.method}</td>
              <td>{element.tag}</td>
              <td>{element.exchangeRates[element.currency].name}</td>
              <td>
                {(Number(element
                  .exchangeRates[element.currency].ask)).toFixed(2)}

              </td>
              <td>
                {(Number(element.value) * Number(element
                  .exchangeRates[element.currency].ask)).toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <input
                  name={ element.id }
                  type="button"
                  data-testid="delete-btn"
                  value="Excluir"
                  onClick={ () => removeExpense(element.id) }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
