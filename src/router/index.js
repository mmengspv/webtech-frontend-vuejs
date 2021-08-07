import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register";
import Logout from "../views/auth/Logout";
import RewardPage from "@/views/reward/View";
import AddReward from "@/views/reward/Add";
import EditReward from "@/views/reward/Edit";
import ExchangeMoney from "@/views/exchange/View";
import Income from "@/views/exchange/Income";
import Leaderboard from "@/views/LeaderboardPage";
import History from "@/views/used/View";
import Trade from "@/views/used/Trade";

Vue.use(VueRouter);

const routes = [
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/reward",
    name: "RewardPage",
    component: RewardPage,
  },
  {
    path: "/exchange",
    name: "ExchangeMoney",
    component: ExchangeMoney,
  },
  {
    path: "/exchange/income",
    name: "Income",
    component: Income,
  },
  {
    path: "/reward/add",
    name: "AddReward",
    component: AddReward,
  },
  {
    path: "/reward/:id/edit",
    name: "EditReward",
    component: EditReward,
  },
  {
    path: "/used",
    name: "History",
    component: History,
  },
  {
    path: "/used/trade",
    name: "Trade",
    component: Trade,
  },
  
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
