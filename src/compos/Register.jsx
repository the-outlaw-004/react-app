import React from "react";
import { useForm } from "./common/useForm";
import Joi from "joi-browser";

const schema = {
  username: Joi.string().email().required().label("Username"),
  password: Joi.string().min(5).required().label("Password"),
  name: Joi.string().required().label("Name"),
};

const initialData = {
  username: "",
  password: "",
  name: "",
};

const Register = () => {
  const doSubmit = (data) => {
  };
  const { renderInput, renderButton, handleSubmit } = useForm(
    schema,
    doSubmit,
    initialData
  );
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderButton("Register")}
      </form>
    </>
  );
};

export default Register;
