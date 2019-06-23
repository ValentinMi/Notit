import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.email,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation
  });
}
