import React, { useEffect } from "react";
import Joi from "joi-browser";
import { useForm } from "./common/useForm";

const schema = {
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
};

const initialData = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const doSubmit = (newData) => {};

  const { handleSubmit, renderButton, renderInput } = useForm(
    schema,
    doSubmit,
    initialData
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
