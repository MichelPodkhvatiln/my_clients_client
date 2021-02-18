<template>
  <div class="admin-dashboard">
    <admin-menu />
  </div>
</template>

<script>
import AdminMenu from "@/components/admin-dashboard/AdminMenu.vue";

export default {
  name: "AdminDashboard",
  components: {
    AdminMenu,
  },
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
</style>
