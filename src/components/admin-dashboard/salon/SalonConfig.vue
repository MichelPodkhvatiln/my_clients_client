<template>
  <section class="salon-config">
    <header class="salon-config__header">
      <div class="salon-config__header--title">
        <h1 class="title">
          {{ headerTitle }}
        </h1>
      </div>
      <div class="salon-config__header--buttons">
        <button v-if="isListMode" class="button is-info" @click="toggleMode">
          Add new salon
        </button>
      </div>
    </header>
    <salon-list
      v-if="isListMode"
      :isLoading="isLoading"
      @onEdit="toggleMode"
      @onBack="toggleMode"
    />
    <salon-form v-else @onBack="toggleMode" />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import SalonForm from "@/components/admin-dashboard/salon/_partial/SalonForm.vue";
import SalonList from "@/components/admin-dashboard/salon/_partial/SalonList.vue";

export default {
  name: "SalonConfig",
  components: {
    SalonForm,
    SalonList
  },
  data() {
    return {
      isListMode: true,
      isLoading: true
    };
  },
  async mounted() {
    try {
      await this.getSalonList();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
  beforeDestroy() {
    this.resetState();
  },
  computed: {
    headerTitle() {
      return this.isListMode ? "Salon List" : "Config salon";
    }
  },
  methods: {
    ...mapActions("salonModule", ["resetState", "getSalonList"]),
    toggleMode() {
      this.isListMode = !this.isListMode;
    }
  }
};
</script>

<style scoped lang="scss">
.salon-config {
  width: 100%;
  height: 100%;
}

.salon-config__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 15px;
}
</style>
