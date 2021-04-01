<template>
  <div class="success-page__wrapper">
    <div class="container">
      {{ pageInfoText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessPage",
  data() {
    return {
      pageInfoText: ""
    };
  },
  beforeMount() {
    const infoText = this.$route.params.infoText;

    if (!infoText) return;

    this.pageInfoText = infoText;
  }
};
</script>

<style lang="scss" scoped>
.success-page__wrapper {
  position: absolute;
  top: 0;
  left: -32px; //remove is-fluid class padding
  right: -32px; //remove is-fluid class padding
  height: 100%;
  overflow-y: auto;
}
</style>
