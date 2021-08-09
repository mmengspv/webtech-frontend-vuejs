import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";
export default {
  async create(payload) {
    console.log(payload);
    const url = api_endpoint + "/exchanges";
    const headers = AuthService.getHeaders();
    const res = await Axios.post(url, payload, headers);
    console.log(res);
    return res;
  },
  async getAllExchange() {
    const headers = AuthService.getHeaders();
    const res = await Axios.get(`${api_endpoint}/exchanges`, headers);
    return res;
  },
  async getUserExchange() {
    const headers = AuthService.getHeaders();
    const res = await Axios.get(`${api_endpoint}/exchanges`, headers);
    return res;
  },
  async updateExchange(payload) {
    const headers = AuthService.getHeaders();
    const res = await Axios.put(
      `${api_endpoint}/exchanges/${payload.id}`,
      payload,
      headers
    );
    return res;
  },
};
