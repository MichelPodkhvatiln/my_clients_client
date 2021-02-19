//import router from "@/router";
import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    user: {
      email: null,
      role: null,
      username: null,
    },
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
    },
  },
  mutations: {
    resetState(state) {
      state.user = {
        email: null,
        role: null,
        username: null,
      };
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async signIn({ commit }, payload) {
      const data = await services.auth.login(payload);

      const user = {
        email: data.email,
        role: data.role,
        username: data.username,
      };

      localStorage.setItem("token", data.accessToken);
      // window.httpClient.bindToken(data.accessToken);

      commit("setUser", user);
    },
    // async signInByToken({ commit }, payload) {
    //   const { data } = await window.httpClient.post(
    //     "/api/auth/sign-in-by-token",
    //     payload
    //   );
    //
    //   const user = {
    //     email: data.email,
    //     role: data.role,
    //     username: data.username,
    //   };
    //
    //   localStorage.setItem("token", data.accessToken);
    //   window.httpClient.bindToken(data.accessToken);
    //
    //   commit("setUser", user);
    // },
    // async signUp({}, payload) {
    //   await window.httpClient.post("/api/auth/sign-up", payload);
    // },
    // async logOut({ commit }) {
    //   const routePath = router.currentRoute.path;
    //   const token = localStorage.getItem("token");
    //
    //   if (token) {
    //     await window.httpClient.post("/api/auth/log-out", { token });
    //   }
    //
    //   if (routePath === "/admin") {
    //     await router.push("/");
    //   }
    //
    //   commit("resetState");
    //
    //   localStorage.removeItem("token");
    //   window.httpClient.removeToken();
    // },
  },
};
