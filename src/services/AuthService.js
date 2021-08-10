import axios from "axios";

const auth_key = "auth-user";
const auth = JSON.parse(localStorage.getItem(auth_key));
const user = auth ? auth.user : "";
const jwt = auth ? auth.jwt : "";

const api_endpoint = process.env.VUE_APP_STRAPI_API || "http://localhost:1337";

export default {
  getUser() {
    return user;
  },
  getJWT() {
    return jwt;
  },
  isLoggedIn() {
    return user !== "" && jwt !== "" ? true : false;
  },
  isAdmin() {
    return user.role.type === "admin";
  },
  getHeaders() {
    if (jwt !== "") {
      return {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
    }
  },
  async login({ email, password }) {
    try {
      const res = await axios.post(`${api_endpoint}/auth/local`, {
        identifier: email,
        password,
      });
      localStorage.setItem(auth_key, JSON.stringify(res.data));
      return {
        success: true,
        user: res.data.user,
        jwt: res.data.jwt,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        message: e.response.data.message[0].messages[0].message,
      };
    }
  },
  logout() {
    localStorage.removeItem(auth_key);
  },
  async register({ username, email, password }) {
    try {
      const res = await axios.post(`${api_endpoint}/auth/local/register`, {
        username,
        email,
        password,
      });
      localStorage.setItem(auth_key, JSON.stringify(res.data));
      return { success: true, user: res.data.user, jwt: res.data.jwt };
    } catch (e) {
      console.error(e.response);
      return {
        success: false,
        message: e.response.data.message[0].messages[0].message,
      };
    }
  },
};
