import router from "@/router";
import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    user: {
      email: null,
      role: null,
      username: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLogIn(state) {
      const user = state.user;

      return user.email && user.role && user.username;
    },
    isAdmin(state) {
      return state.user.role === "admin";
    }
  },
  mutations: {
    resetState(state) {
      state.user = {
        email: null,
        role: null,
        username: null
      };
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async getUser({ commit }, { userId }) {
      const { data } = await services.user.getUser(userId);

      const user = {
        email: data.email,
        role: data.role,
        username: data.username
      };

      commit("setUser", user);
    },
    async login({ commit }, credentials) {
      const { data } = await services.auth.login(credentials);

      const user = {
        email: data.email,
        role: data.role,
        username: data.username
      };

      services.auth.setToken(data.accessToken);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("token", data.accessToken);

      commit("setUser", user);
    },
    async logOut({ commit }) {
      const routePath = router.currentRoute.path;

      if (routePath === "/admin") {
        await router.push("/");
      }

      commit("resetState");

      services.auth.deleteToken();
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
    async signUp({}, credentials) {
      await services.auth.signUp(credentials);
    }
  }
};
