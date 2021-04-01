<template>
  <section class="record-process-page__wrapper">
    <record-form v-if="salonId" :salon-id="salonId" />
    <span v-else>Invalid salon!</span>
  </section>
</template>

<script>
import RecordForm from "@/components/record-page/RecordForm.vue";

export default {
  name: "RecordProcessPage",
  components: {
    RecordForm
  },
  data() {
    return {
      salonId: null
    };
  },
  created() {
    const salonId = this.$route.params?.salonId;

    if (!salonId) return;

    this.salonId = salonId;
  }
};
</script>

<style scoped lang="scss">
.record-process-page__wrapper {
  position: absolute;
  top: 0;
  left: -32px; //remove is-fluid class padding
  right: -32px; //remove is-fluid class padding
  height: 100%;
  overflow-y: auto;
}
</style>
