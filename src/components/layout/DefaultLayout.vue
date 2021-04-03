<template>
  <div class="page-layout">
    <navbar />
    <div class="container is-fluid">
      <main class="page-layout__main">
        <router-view />
      </main>
    </div>
    <footer class="page-footer">
      <span class="page-footer__info-text">
        Copyright &#169;2021 Michel Podkhvatilin
      </span>

      <span class="page-footer__info-text">
        DDMA 2021
      </span>
    </footer>

    <confirm-modal />
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import ConfirmModal from "@/components/shared/ConfirmModal.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    ConfirmModal
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
  position: relative;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
}

.page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  height: 50px;
  width: 100%;
  background-color: #363636;
}

.page-footer__info-text {
  color: #ffffff;
}
</style>
