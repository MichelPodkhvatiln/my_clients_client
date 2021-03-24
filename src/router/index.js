import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue")
  },
  {
    path: "/record",
    name: "Record",
    component: () =>
      import(/* webpackChunkName: "record" */ "../views/Record.vue")
  },
  {
    path: "/record/:salonId",
    name: "RecordProcess",
    component: () =>
      import(
        /* webpackChunkName: "recordProcess" */ "../views/RecordProcessPage.vue"
      )
  },
  {
    path: "/about",
    name: "About",
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
      ),
    children: [
      {
        path: "salon",
        component: () =>
          import(
            /* webpackChunkName: "salonConfig" */ "../components/admin-dashboard/salon/SalonConfig.vue"
          )
      },
      {
        path: "masters",
        component: () =>
          import(
            /* webpackChunkName: "salonConfig" */ "../components/admin-dashboard/masters/MastersConfig.vue"
          )
      },
      {
        path: "masters/:masterId",
        component: () =>
          import(
            /* webpackChunkName: "masterProfile" */ "../components/admin-dashboard/masters/_partial/MasterProfile.vue"
          )
      },
      {
        path: "services",
        component: () =>
          import(
            /* webpackChunkName: "servicesConfig" */ "../components/admin-dashboard/services/ServicesConfig.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
