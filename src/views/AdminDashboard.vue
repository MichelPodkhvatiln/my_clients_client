<template>
  <div class="admin-dashboard">
    <div class="admin-dashboard__menu">
      <admin-menu />
    </div>

    <div class="admin-dashboard__view">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminMenu from "@/components/admin-dashboard/AdminMenu.vue";

export default {
  name: "AdminDashboard",
  components: {
    AdminMenu
  }
};
</script>

<style scoped lang="scss">
.admin-dashboard {
  position: absolute;
  top: 0;
  left: -32px; //remove is-fluid class padding
  right: -32px; //remove is-fluid class padding
  display: flex;
  height: 100%;
}

.admin-dashboard__menu {
  padding: 10px;
  min-width: 200px;
  width: 20%;
}

.admin-dashboard__view {
  padding: 10px;
  width: 80%;
}
</style>
