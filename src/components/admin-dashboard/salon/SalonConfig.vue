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
    <component :is="activeComponentName" @onBack="toggleMode" />
  </section>
</template>

<script>
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
      isListMode: true
    };
  },
  computed: {
    activeComponentName() {
      return this.isListMode ? "SalonList" : "SalonForm";
    },
    headerTitle() {
      return this.isListMode ? "Salon List" : "Config salon";
    }
  },

  methods: {
    toggleMode() {
      //TODO confirm modal on canceling
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
