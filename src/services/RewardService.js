import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";
export default {
  async create(payload) {
    const url = api_endpoint + "/rewards";
    const headers = AuthService.getHeaders();
    const res = await Axios.post(url, payload, headers);
    return res;
    // let res = await Axios.post(url, body);
  },
  async getAllReward() {
    const res = await Axios.get(`${api_endpoint}/rewards`);
    return res;
  },
  async getRewardById(id) {
    let res = await Axios.get(`${api_endpoint}/rewards/${id}`);
    return res.data;
  },
};
