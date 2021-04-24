import Vue from "vue";
import router from "@/router";
import { services } from "@/utils/services";

export default {
  namespaced: true,
  state: {
    user: {
      id: null,
      email: null,
      profile: null,
      role: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    username(state) {
      const profile = state.user.profile;

      if (!profile) {
        return "";
      }

      return `${profile.firstName} ${profile.lastName}`;
    },
    isUserLogIn(state) {
      return !Object.values(state.user).includes(null);
    },
    isAdmin(state) {
      return state.user.role === "admin";
    }
  },
  mutations: {
    resetState(state) {
      state.user = {
        id: null,
        email: null,
        profile: null,
        role: null
      };
    },
    setUser(state, payload) {
      state.user = payload;
    },
    updateField(state, { field, value }) {
      if (state.user[field]) {
        Vue.set(state.user, field, value);
        return;
      }

      if (state.user.profile[field]) {
        Vue.set(state.user.profile, field, value);
      }
    }
  },
  actions: {
    async getUser({ commit }, { userId }) {
      const { data } = await services.user.getUser(userId);

      const user = {
        id: data.id,
        email: data.email,
        profile: data.profile,
        role: data.role
      };

      commit("setUser", user);
    },
    async login({ commit }, credentials) {
      const { data } = await services.auth.login(credentials);

      const user = {
        id: data.id,
        email: data.email,
        profile: data.profile,
        role: data.role
      };

      services.auth.setToken(data.accessToken);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("token", data.accessToken);

      commit("setUser", user);
    },
    async signUp({}, credentials) {
      await services.auth.signUp(credentials);
    },
    async logOut({ commit }) {
      const routePath = router.currentRoute.path;

      if (routePath.includes("admin") || routePath.includes("profile")) {
        await router.push("/");
      }

      commit("resetState");

      services.auth.deleteToken();
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
    async updateProfile({ commit }, { userId, field, value }) {
      try {
        const { data } = await services.user.updateProfile(userId, {
          field,
          value
        });

        const payload = {
          field: data.field,
          value: data.value
        };

        commit("updateField", payload);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async updateEmail({ commit }, { userId, email }) {
      try {
        const { data } = await services.user.updateEmail(userId, { email });

        const payload = {
          field: data.field,
          value: data.value
        };

        commit("updateField", payload);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async updatePassword({}, { userId, password }) {
      try {
        await services.user.updatePassword(userId, { password });
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
};
