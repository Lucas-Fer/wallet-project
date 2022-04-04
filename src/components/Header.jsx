import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderStyle from '../css/header';

export class Header extends Component {
  handleSpend = () => {
    const { totalSpent } = this.props;
    const reduceSpent = totalSpent.length >= 1
      ? totalSpent
        .reduce((acc, curr) => {
          const { currency, exchangeRates, value } = curr;
          const valueExpense = Number(value);
          const valueCotacao = exchangeRates[currency].ask;
          return acc + (valueExpense * valueCotacao);
        }, 0) : 0;
    return reduceSpent;
  }

  render() {
    const { props: { userEmail }, handleSpend } = this;
    return (
      <HeaderStyle>
        <h2>TrybeWallet</h2>

        <span
          data-testid="email-field"
        >
          Logado com:
          {userEmail}
        </span>

        <span
          data-testid="total-field"
          value="0"
        >
          Despesas:
          {`R$: ${handleSpend().toFixed(2)}`}
        </span>

        <span
          data-testid="header-currency-field"
        >
          Câmbio utilizado: BRL
        </span>
      </HeaderStyle>
    );
  }
}

Header.defaultProps = {
  totalSpent: [],
};

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalSpent: PropTypes.arrayOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSpent: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
