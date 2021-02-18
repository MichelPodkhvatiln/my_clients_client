<template>
  <div id="app">
    <default-layout v-if="!isLoading" />
    <div v-else class="loading-block">loading</div>
  </div>
</template>

<script>
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async beforeMount() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.isLoading = false;
      return;
    }

    const payload = {
      token,
    };

    try {
      await this.signInByToken(payload);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("userModule", ["signInByToken"]),
  },
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
</style>
