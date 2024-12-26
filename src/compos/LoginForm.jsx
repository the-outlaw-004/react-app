import React from "react";
import Joi from "joi-browser";
import { useForm } from "./common/useForm";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const schema = {
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
};

const initialData = {
  username: "",
  password: "",
};

const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const doSubmit = async (newData, setError) => {
    try {
      const jwt = await auth.login(newData);
      const decoded = jwtDecode(jwt);
      setUser(decoded);

      navigate(location.state ? location.state.from.pathName : "/");
      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex);
        toast.error(ex && ex.response.data);
        setError({ username: ex.response.data });
      }
    }
  };

  const { handleSubmit, renderButton, renderInput } = useForm(
    schema,
    doSubmit,
    initialData
  );

  if (auth.getCurrentUser()) return <Navigate to="/" />;

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
