<template>
  <section class="page-wrapper">
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
