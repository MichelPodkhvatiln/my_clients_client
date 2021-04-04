<template>
  <div class="page-wrapper">
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

<style lang="scss" scoped></style>
