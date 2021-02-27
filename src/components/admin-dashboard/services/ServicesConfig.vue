<template>
  <section class="services-config">
    <div v-if="servicesList.length">
      {{ servicesList }}
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ServicesConfig",
  async beforeMount() {
    try {
      await this.getServicesList();
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    ...mapGetters("servicesModule", ["servicesList"])
  },
  methods: {
    ...mapActions("servicesModule", ["getServicesList"])
  }
};
</script>

<style scoped lang="scss">
.services-config {
  width: 100%;
  height: 100%;
}
</style>
