import httpService from "./httpService";

const url = `${process.env.REACT_APP_ENDPOINT}/tipi`;

export function get() {
  return httpService.get(url);
}

export function getById(id) {
  return httpService.get(`${url}/${id}`);
}

const defaultExport = {
  get,
  getById,
};

export default defaultExport;
