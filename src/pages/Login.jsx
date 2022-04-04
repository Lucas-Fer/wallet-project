import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../actions';

export class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      inputEmail: '',
      inputPassword: '',
    };
  }

  handleButton = () => {
    const { inputEmail, inputPassword } = this.state;
    const SIX = 6;
    if (inputPassword.length >= SIX
      && inputEmail.includes('@')
      && inputEmail.includes('.com')) this.setState({ isDisable: false });
    else this.setState({ isDisable: true });
  }

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.handleButton());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, saveUserEmail } = this.props;
    const { inputEmail } = this.state;
    history.push('/carteira');
    saveUserEmail(inputEmail);
  }

  render() {
    const {
      state: {
        isDisable,
        inputEmail,
        inputPassword },
      handleInput, handleSubmit } = this;
    return (
      <>
        <h1>TrybeWallet</h1>

        <form>
          <input
            type="email"
            name="inputEmail"
            data-testid="email-input"
            onChange={ handleInput }
            value={ inputEmail }
            required
          />
          <input
            type="password"
            name="inputPassword"
            data-testid="password-input"
            onChange={ handleInput }
            value={ inputPassword }
            required
          />
          <input
            type="submit"
            value="Entrar"
            onClick={ handleSubmit }
            disabled={ isDisable }
          />
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  saveUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(saveUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
