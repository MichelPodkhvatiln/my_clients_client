<template>
  <div id="app">
    <default-layout />
  </div>
</template>

<script>
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout
  }
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
</style>
