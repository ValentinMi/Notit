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

export function updateThisDayNoted() {
  return http.put(apiEndPoint + "/daynoted");
}

export async function getNotingStatus() {
  const { data } = await http.get(apiEndPoint + "/me");
  return data.thisDayNoted;
}
