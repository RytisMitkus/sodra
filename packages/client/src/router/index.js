import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Company from "../views/Company.vue";
// import store from "../store";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/company/:id",
    name: "company",
    component: Company,
    props: true,
  },
  {
    path: "/register",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name == "Dashboard" && localStorage.getItem("auth")) next();
  else if (to.name == "Home") next();
  else if (to.name == "Login" || to.name == "SignUp") next();
  else next({ name: "Home" });
});
export default router;
