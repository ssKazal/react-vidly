import Joi from 'joi';
import React from 'react';
import Form from './Common/Form';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: { username: '', password: '' },
  };

  schemaMap = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  schema = Joi.object(this.schemaMap);

  doSubmit = () => {
    // Call the server
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
