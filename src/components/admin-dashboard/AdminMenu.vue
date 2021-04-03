<template>
  <aside class="menu">
    <p class="menu-label">Главное меню</p>
    <ul class="menu-list">
      <li v-for="link in linkList.general" :key="link.path">
        <router-link :class="{ 'is-active': link.isActive }" :to="link.path">
          {{ link.title }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "AdminMenu",
  computed: {
    linkList() {
      return {
        general: [
          {
            path: "/admin/salon",
            title: "Управление салонами",
            isActive: this.currentRoute.includes("salon")
          },
          {
            path: "/admin/masters",
            title: "Управление мастерами",
            isActive: this.currentRoute.includes("masters")
          },
          {
            path: "/admin/services",
            title: "Управление сервисами",
            isActive: this.currentRoute.includes("services")
          }
        ]
      };
    },
    currentRoute() {
      return this.$route.path;
    }
  }
};
</script>
