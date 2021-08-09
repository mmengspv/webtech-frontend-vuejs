import Axios from "axios";
import AuthService from "./AuthService";
const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";

export default {
  async getAllUser() {
    const res = await Axios.get(`${api_endpoint}/users`);
    return res;
  },
  async create(payload) {
    const url = api_endpoint + "/users";
    const headers = AuthService.getHeaders();
    const res = await Axios.post(url, payload, headers);
    return res;
  },
  async updateUserById(payload) {
    const url = api_endpoint + "/users/" + payload.id;
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
  async getUserById(id) {
    const headers = AuthService.getHeaders();
    const res = await Axios.get(`${api_endpoint}/users/${id}`, headers);
    return res.data;
  },
};
