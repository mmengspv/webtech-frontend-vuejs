import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";
export default {
  async create(payload) {
    const url = "http://localhost:1337" + "/points";
    // console.log("url", url);
    // console.log("payload", payload);
    const headers = AuthService.getHeaders();
    const res = await Axios.post(url, payload, headers);
    console.log("return create", res);
    return res;
  },
  async getAllPoint() {
    const headers = AuthService.getHeaders();
    const res = await Axios.get(`${api_endpoint}/points`, headers);
    return res;
  },
};
