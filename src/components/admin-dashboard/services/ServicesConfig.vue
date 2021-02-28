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

    <ul v-if="servicesList.length" class="services-config__list">
      <li
        v-for="service in servicesList"
        :key="service._id"
        class="services-config__list--item"
      >
        <service-list-item :service="service" />
      </li>
    </ul>

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
  width: 100%;
  height: 100%;
}

.services-config__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 15px;
  min-height: 60px;
}

.services-config__list {
  list-style: none;
}

.services-config__list--item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
