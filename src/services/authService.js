import { jwtDecode } from "jwt-decode";
import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_BASE_URL + "auth";
const tokenKey = "auth-token";

http.setJwt(getJWT());

async function login(data) {
  const creds = {
    email: data.username,
    password: data.password,
  };
  const { data: jwt } = await http.post(apiEndpoint, creds);
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
  return jwt;
}

function getJWT() {
  return localStorage.getItem(tokenKey);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}

const auth = { login, logout, getCurrentUser, loginWithJwt };

export default auth;
