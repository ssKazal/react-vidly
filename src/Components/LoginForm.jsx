import Joi from 'joi';
import React from 'react';
import Form from './Common/Form';
import { login } from '../Services/TokenService';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: { email: '', password: '' },
  };

  schemaMap = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .label('email'),
    password: Joi.string().required().label('Password'),
  };

  schema = Joi.object(this.schemaMap);

  doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem('access_token', jwt.access);
      localStorage.setItem('refresh_token', jwt.refresh);
      // this.props.history.push('/');
      window.location = '/';
    } catch (e) {
      console.log(e.response, e.response.status);
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
