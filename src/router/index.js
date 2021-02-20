import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    beforeEnter: (to, from, next) => {
      if (store.getters["userModule/isAdmin"]) {
        next();
      } else {
        next(false);
      }
    },
    component: () =>
      import(
        /* webpackChunkName: "adminDashboard" */ "../views/AdminDashboard.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
