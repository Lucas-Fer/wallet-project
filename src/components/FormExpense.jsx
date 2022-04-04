import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiTwo, fetchAPI, getCoins } from '../actions';

export class FormExpense extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'payment',
      tag: 'TAG',
      description: '',
      isDisable: true,
    };
  }

  componentDidMount = () => {
    const { requestCoins } = this.props;
    requestCoins();
    // requestApi();
  }

  handleInputValue = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.verifySelect());
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { addExpenseToState } = this.props;
    const {
      value,
      currency,
      description,
      method,
      tag,
    } = this.state;

    const inputData = {
      value,
      currency,
      description,
      method,
      tag,
    };

    addExpenseToState(inputData);
    this.setState({ value: '', description: '' });
  }

  verifySelect = () => {
    const { method, tag } = this.state;
    if (method === 'payment'
      || tag === 'TAG') this.setState({ isDisable: true });

    else this.setState({ isDisable: false });
  }

  render() {
    const {
      props: {
        arrayCoins,
      },
      state: {
        value,
        currency,
        description,
        method,
        tag,
        isDisable,
      },
      handleInputValue, handleSubmit } = this;

    return (
      <section>
        <form>

          <span>Valor da despesa:</span>
          <input
            name="value"
            data-testid="value-input"
            type="number"
            onChange={ handleInputValue }
            value={ value }
          />

          <span>Descrição:</span>
          <input
            name="description"
            data-testid="description-input"
            type="text"
            onChange={ handleInputValue }
            value={ description }
          />

          <select
            name="currency"
            data-testid="currency-input"
            onChange={ handleInputValue }
            aria-label="moeda"
            value={ currency }
          >

            {
              arrayCoins.map((coin, index) => (
                <option
                  key={ index }
                  data-testid={ coin }
                  value={ coin }
                >
                  {coin}
                </option>))
            }
          </select>

          <select
            name="method"
            data-testid="method-input"
            onChange={ handleInputValue }
            value={ method }
          >
            <option
              value="payment"
              disabled
            >
              Pagamento
            </option>

            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            onChange={ handleInputValue }
            value={ tag }
          >
            <option
              value="TAG"
              disabled
            >
              TAG
            </option>

            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          <input
            type="button"
            value="Adicionar despesa"
            onClick={ handleSubmit }
            disabled={ isDisable }
          />
        </form>

      </section>
    );
  }
}

FormExpense.propTypes = {
  addExpenseToState: PropTypes.func.isRequired,
  requestCoins: PropTypes.func.isRequired,
  arrayCoins: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpenseToState: (data) => dispatch(fetchApiTwo(data)),
  requestApi: () => dispatch(fetchAPI()),
  requestCoins: () => dispatch(getCoins()),
});

const mapStateToProps = (state) => ({
  arrayCoins: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
