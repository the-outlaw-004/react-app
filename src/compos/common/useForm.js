import { useEffect, useState } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

export function useForm(schema, doSubmit, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState({});

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const validate = () => {
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (!error) return null;
    let newErrors = {};
    for (let item of error.details) {
      newErrors[item.path[0]] = item.message;
    }
    return newErrors;
  };

  function validateProperty(name, value) {
    const obj = { name: value };
    const newSchema = { name: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    return error ? error.details[0].message : null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    setError(errors);
    if (errors) return;
    doSubmit(data, setError);
    setData(initialData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...error };
    const errorsMessage = validateProperty(name, value);
    if (errorsMessage) newErrors[name] = errorsMessage;
    else delete newErrors[name];
    setError(newErrors);
    setData({ ...data, [name]: value });
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={error && error[name]}
      />
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        options={options}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={error && error[name]}
      />
      //   <Input
      //   />
    );
  };

  const renderButton = (label) => {
    return (
      <button
        className="btn btn-primary"
        //    disabled={validate()}
      >
        {label}
      </button>
    );
  };
  return {
    handleSubmit,
    validate,
    renderButton,
    renderInput,
    renderSelect,
  };
}
