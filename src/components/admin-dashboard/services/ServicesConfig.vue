<template>
  <section class="services-config">
    <header class="services-config__header">
      <div class="services-config__header--title">
        <h1 class="title">
          Service management
        </h1>
      </div>
      <div class="services-config__header--buttons">
        <button class="button is-link" @click="onAddServiceClick">
          Add new service
        </button>
      </div>
    </header>

    <div class="container is-fluid">
      <ul v-if="servicesList.length">
        <li v-for="service in servicesList" :key="service._id" class="mb-2">
          <service-list-item :service="service" />
        </li>
      </ul>
    </div>

    <MountingPortal mountTo="body" append>
      <service-modal />
    </MountingPortal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ServiceListItem from "@/components/admin-dashboard/services/_partial/ServiceListItem.vue";
import ServiceModal from "@/components/admin-dashboard/services/_partial/ServiceModal.vue";

export default {
  name: "ServicesConfig",
  components: {
    ServiceListItem,
    ServiceModal
  },
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
    ...mapActions("servicesModule", ["getServicesList"]),
    onAddServiceClick() {
      this.$modal.show("service-modal", { mode: "add" });
    }
  }
};
</script>

<style scoped lang="scss">
.services-config {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.services-config__header {
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
