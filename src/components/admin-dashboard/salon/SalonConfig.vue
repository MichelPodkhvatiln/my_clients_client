<template>
  <section class="salon-config">
    <header class="salon-config__header">
      <div class="salon-config__header--title">
        <h1 class="title">
          Управление салонами
        </h1>
      </div>
      <div class="salon-config__header--buttons">
        <button v-if="isListMode" class="button is-link" @click="toggleMode">
          Добавить новый салон
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
  methods: {
    ...mapActions("salonModule", ["resetState", "getSalonList"]),
    toggleMode() {
      this.isListMode = !this.isListMode;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./src/scss/mixins";

.salon-config {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  @include scrollBar();
}

.salon-config__header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 15px;
  height: 60px;
  background-color: #fdfdfd;
  box-shadow: 0 3px 4px 0 rgba(#000000, 0.1), 0 3px 3px -2px rgba(#000000, 0.07),
    0 1px 8px 0 rgba(#000000, 0.006);
}
</style>
