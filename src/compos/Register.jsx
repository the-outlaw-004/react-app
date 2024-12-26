import React from "react";
import { useForm } from "./common/useForm";
import Joi from "joi-browser";
import { registerUser } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";
import { jwtDecode } from "jwt-decode";

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

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const doSubmit = async (data, setError) => {
    try {
      const response = await registerUser(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      const decoded = jwtDecode(response.headers["x-auth-token"]);
      setUser(decoded);
      navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        setError({ username: ex.response.data });
      }
    }
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
