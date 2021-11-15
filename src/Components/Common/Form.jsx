import React from 'react';
import Joi from 'joi';
import Input from './Input';
import Select from './Select';

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };

    const { error } = this.schema.validate(this.state.data, options);

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

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = Joi.object({ [name]: this.schemaMap[name] });

    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return <Select name={name} value={data[name]} label={label} options={options} onChange={this.handleChange} error={errors[name]} />;
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return <Input type={type} name={name} value={data[name]} onChange={this.handleChange} error={errors[name]} label={label} />;
  }

  renderButton(label) {
    return (
      <button type="submit" className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
}

export default Form;
