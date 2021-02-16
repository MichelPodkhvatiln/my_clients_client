<template>
  <div class="page-layout">
    <navbar />
    <div class="container is-fluid">
      <main class="page-layout__main">
        <router-view />
      </main>
    </div>

    <modal name="sign-in-modal">
      <div>
        Hello
      </div>
    </modal>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar
  }
};
</script>
<style scoped lang="scss">
.page-layout {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
}

.page-layout__main {
  width: 100%;
  position: relative;
  max-height: 100%;
  min-height: 100%;
}
</style>
