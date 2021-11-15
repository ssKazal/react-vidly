import React from 'react';
import Form from './Common/Form';
import Joi from 'joi';

class RegistrationForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: { username: '', password: '', name: '' },
  };

  schemaMap = {
    username: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
  };

  schema = Joi.object(this.schemaMap);

  doSubmit = () => {
    // Call the server
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
