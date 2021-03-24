<template>
  <div class="main-page__wrapper">
    <div class="container">
      Main page
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style scoped lang="scss">
.main-page__wrapper {
  position: absolute;
  top: 0;
  left: -32px; //remove is-fluid class padding
  right: -32px; //remove is-fluid class padding
  height: 100%;
  overflow-y: auto;
}
</style>
