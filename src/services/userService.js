import httpService from "./httpService";

const url = `${process.env.REACT_APP_ENDPOINT}/users`;

export function register(user) {
  return httpService.post(url, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
