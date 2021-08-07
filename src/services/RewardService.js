import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";
export default {
  async create(payload) {
    const url = api_endpoint + "/rewards";
    const headers = AuthService.getHeaders();
    const res = await Axios.post(url, payload, headers);
    return res;
  },
  async uploadImage(data) {
    const headers = AuthService.getHeaders();
    const res = await Axios.post(api_endpoint + "/upload", data, headers);
    return res;
  },
  async getAllReward() {
    const res = await Axios.get(`${api_endpoint}/rewards`);
    return res;
  },
  async getRewardById(id) {
    const res = await Axios.get(`${api_endpoint}/rewards/${id}`);
    return res.data;
  },
  async updateRewardById(payload) {
    const url = api_endpoint + "/rewards/" + payload.id;
    console.log("payload", payload);
    const body = {
      reward_name: payload.reward_name,
      exchange_point: payload.exchange_point,
      detail: payload.detail,
      image: payload.image_id,
    };
    const headers = AuthService.getHeaders();
    const res = await Axios.put(url, body, headers);
    return res;
  },
};
