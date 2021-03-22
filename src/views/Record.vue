<template>
  <div class="record-page__wrapper">
    <record-form v-if="salonId" :salonId="salonId" />
    <span v-else>
      Invalid Salon
    </span>
  </div>
</template>

<script>
import RecordForm from "@/components/record-page/RecordForm.vue";

export default {
  name: "Record",
  components: {
    RecordForm
  },
  data() {
    return {
      salonId: null
    };
  },
  created() {
    this.salonId = this.$route.params.salonId ?? null;
  }
};
</script>

<style scoped lang="scss">
.record-page__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
}
</style>
