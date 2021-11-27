import React from 'react';
import Form from './Common/Form';
import Joi from 'joi';
import * as UserService from '../Services/UserService';

class RegistrationForm extends Form {
  state = {
    data: { email: '', password: '', confirmPassword: '' },
    errors: { email: '', password: '', confirmPassword: '' },
  };

  schemaMap = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    confirmPassword: Joi.string().required().min(5).label('Confirm Password'),
  };

  schema = Joi.object(this.schemaMap);

  doSubmit = async () => {
    // Call the server
    try {
      await UserService.register(this.state.data);
      console.log('Submitted');
    } catch (e) {
      console.log(e.response.data.email[0], e.response.status);
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = e.response.data.email[0];
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('confirmPassword', 'Confirm Password', 'password')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
