<template>
  <div id="app">
    <default-layout v-if="!isLoading" />
    <div v-else class="loading-block">
      <half-circle-spinner
        :animation-duration="1000"
        :size="80"
        color="#00d1b2"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { HalfCircleSpinner } from "epic-spinners";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    HalfCircleSpinner
  },
  data() {
    return {
      isLoading: true
    };
  },
  async beforeMount() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      this.isLoading = false;
      return;
    }

    try {
      await this.getUser({ userId });
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("userModule", ["getUser"])
  }
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}

.loading-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
</style>
