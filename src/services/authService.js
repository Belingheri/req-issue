import jwtDecode from "jwt-decode";

import httpService, { setJwt } from "./httpService";

const url = `${process.env.REACT_APP_ENDPOINT}/users`;
const tokenName = "token";

setJwt(getJwt());

export async function login(email, password) {
  try {
    const { data: token } = await httpService.post(`${url}/login`, {
      email,
      password,
    });
    loginWithJwt(token.accessToken);
  } catch (error) {
    throw error;
  }
}

export function loginWithJwt(token) {
  localStorage.setItem(tokenName, token);
}

export function logout() {
  localStorage.removeItem(tokenName);
}
export function getcurrentUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem("token");
}
