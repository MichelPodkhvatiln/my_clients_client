<template>
  <section class="salon-config">
    <header class="salon-config__header">
      <div class="salon-config__header--title">
        <h1 class="title">
          {{ headerTitle }}
        </h1>
      </div>
      <div class="salon-config__header--buttons">
        <button v-if="!isAddMode" class="button is-info" @click="toggleAddMode">
          Add new salon
        </button>
        <button v-else class="button is-danger" @click="toggleAddMode">
          Cancel
        </button>
      </div>
    </header>
    <component :is="activeComponentName" />
  </section>
</template>

<script>
import AddSalon from "@/components/admin-dashboard/salon/_partial/AddSalon.vue";
import SalonList from "@/components/admin-dashboard/salon/_partial/SalonList.vue";

export default {
  name: "SalonConfig",
  components: {
    AddSalon,
    SalonList
  },
  data() {
    return {
      isAddMode: false
    };
  },
  computed: {
    activeComponentName() {
      return this.isAddMode ? "AddSalon" : "SalonList";
    },
    headerTitle() {
      return this.isAddMode ? "Create salon" : "Salon List";
    }
  },

  methods: {
    toggleAddMode() {
      //TODO confirm modal on canceling
      this.isAddMode = !this.isAddMode;
    }
  }
};
</script>

<style scoped lang="scss">
.salon-config__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
</style>
