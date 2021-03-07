<template>
  <aside class="menu">
    <p class="menu-label">General</p>
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
            path: "/admin",
            title: "Main",
            isActive: this.currentRoute === "/admin"
          },
          {
            path: "/admin/salon",
            title: "Salons management",
            isActive: this.currentRoute.includes("salon")
          },
          {
            path: "/admin/masters",
            title: "Masters management",
            isActive: this.currentRoute.includes("masters")
          },
          {
            path: "/admin/services",
            title: "Service management",
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
