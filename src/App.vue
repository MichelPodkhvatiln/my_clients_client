<template>
  <div id="app">
    <default-layout />

    <modal name="sign-in-modal">
      <sign-in-form />
    </modal>
  </div>
</template>

<script>
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import SignInForm from "@/components/forms/SignInForm.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    SignInForm
  }
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
</style>
