import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_API_BASE_URL + "users";

export function registerUser(data) {
  const user = {
    email: data.username,
    password: data.password,
    name: data.name,
  };

  return http.post(apiEndpoint, user);
}
