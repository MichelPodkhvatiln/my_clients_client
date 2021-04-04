import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    meta: {
      title: "Главная"
    }
  },
  {
    path: "/record",
    name: "Record",
    component: () =>
      import(/* webpackChunkName: "record" */ "../views/Record.vue"),
    meta: {
      title: "Записаться"
    }
  },
  {
    path: "/record/:salonId",
    name: "RecordProcess",
    component: () =>
      import(
        /* webpackChunkName: "recordProcess" */ "../views/RecordProcessPage.vue"
      ),
    meta: {
      title: "Записаться"
    }
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
    meta: {
      title: "Обратная связь"
    }
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
    meta: {
      title: "Кабинет администратора"
    },
    children: [
      {
        path: "salon",
        component: () =>
          import(
            /* webpackChunkName: "salonConfig" */ "../components/admin-dashboard/salon/SalonConfig.vue"
          ),
        meta: {
          title: "Управление салонами"
        }
      },
      {
        path: "masters",
        component: () =>
          import(
            /* webpackChunkName: "salonConfig" */ "../components/admin-dashboard/masters/MastersConfig.vue"
          ),
        meta: {
          title: "Управление мастерами"
        }
      },
      {
        path: "masters/:masterId",
        component: () =>
          import(
            /* webpackChunkName: "masterProfile" */ "../components/admin-dashboard/masters/_partial/MasterProfile.vue"
          ),
        meta: {
          title: "Настройка мастера"
        }
      },
      {
        path: "services",
        component: () =>
          import(
            /* webpackChunkName: "servicesConfig" */ "../components/admin-dashboard/services/ServicesConfig.vue"
          ),
        meta: {
          title: "Управление сервисами"
        }
      }
    ]
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: () =>
      import(/* webpackChunkName: "successPage" */ "../views/SuccessPage.vue"),
    meta: {
      title: "Успех"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title ? to.meta.title : "default title";
  });
});

export default router;
