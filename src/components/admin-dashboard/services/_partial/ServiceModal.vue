<template>
  <modal
    name="service-modal"
    height="auto"
    :clickToClose="false"
    @before-open="beforeOpen"
  >
    <service-form :mode="mode" :service-id="serviceId" />
  </modal>
</template>

<script>
import ServiceForm from "@/components/admin-dashboard/services/_partial/ServiceForm.vue";

export default {
  name: "ServiceModal",
  components: {
    ServiceForm
  },
  data() {
    return {
      mode: undefined,
      serviceId: undefined
    };
  },
  methods: {
    beforeOpen(event) {
      const params = event.params;

      if (!params?.mode) {
        event.cancel();
        return;
      }

      this.mode = params.mode;
      this.serviceId = params.serviceId;
    }
  }
};
</script>
<style scoped lang="scss">
.error-block {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
</style>
