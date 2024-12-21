import React from "react";
import Joi from "joi-browser";
import { useForm } from "./common/useForm";

const LoginForm = () => {
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const doSubmit = (newData) => {};

  const { handleSubmit, renderButton, renderInput } = useForm(
    schema,
    doSubmit,
    {
      username: "",
      password: "",
    }
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password")}
        {renderButton("Login")}
      </form>
    </>
  );
};

export default LoginForm;
