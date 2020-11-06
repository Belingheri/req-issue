import httpService from "./httpService";

const url = `${process.env.REACT_APP_ENDPOINT}/richieste`;

export function get() {
  return httpService.get(url);
}
