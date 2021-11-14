import Joi from 'joi';
import React from 'react';
import Input from './Common/Input';

class Login extends React.Component {
  state = {
    account: { username: '', password: '' },
    errors: { username: '', password: '' },
  };

  schemaMap = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  schema = Joi.object(this.schemaMap);

  validate = () => {
    const options = { abortEarly: false };

    const { error } = this.schema.validate(this.state.account, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    // result.error.details.map((item) => {
    //   return (errors[item.path[0]] = item.message);
    // });
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log('Submitted');
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = Joi.object({ [name]: this.schemaMap[name] });

    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input name="username" value={account.username} onChange={this.handleChange} error={errors.username} label="Username" />
          <Input name="password" value={account.password} onChange={this.handleChange} error={errors.password} label="Password" />
          <button type="submit" className="btn btn-primary" disabled={this.validate()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
