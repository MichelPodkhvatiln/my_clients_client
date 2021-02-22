<template>
  <div>
    <ul v-if="salonsList.length">
      <li v-for="salon in salonsList" :key="salon._id">
        {{ salon }}
      </li>
    </ul>
    Salon List
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SalonList",
  async mounted() {
    try {
      await this.getSalonList();
    } catch (error) {
      console.error(error);
    }
  },
  beforeDestroy() {
    this.resetState();
  },
  computed: {
    ...mapGetters("salonModule", ["salonsList"])
  },
  methods: {
    ...mapActions("salonModule", ["resetState", "getSalonList"])
  }
};
</script>

<style scoped lang="scss"></style>
