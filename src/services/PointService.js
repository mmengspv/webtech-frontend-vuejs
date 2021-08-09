import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";
export default {
  async create(payload) {
    const url = api_endpoint + "/points";
    const headers = AuthService.getHeaders();
    const res = await Axios.post(url, payload, headers);
    return res;
  },
  async getAllPoint() {
    const headers = AuthService.getHeaders();
    const res = await Axios.get(`${api_endpoint}/points`, headers);
    return res;
  },
};
