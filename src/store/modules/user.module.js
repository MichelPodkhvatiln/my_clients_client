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
    async signIn({ commit }, payload) {
      const { data } = await window.httpClient.post(
        "/api/auth/sign-in",
        payload
      );

      const user = {
        email: data.email,
        role: data.role,
        username: data.username
      };

      localStorage.setItem("token", data.accessToken);
      window.httpClient.bindToken(data.accessToken);

      commit("setUser", user);
    },
    // eslint-disable-next-line no-empty-pattern
    async signUp({}, payload) {
      await window.httpClient.post("/api/auth/sign-up", payload);
    },
    signOut({ commit }) {
      commit("resetState");

      localStorage.removeItem("token");
      window.httpClient.removeToken();
    },
    async testAdmin() {
      await window.httpClient.get("/api/test/admin");
    }
  }
};
