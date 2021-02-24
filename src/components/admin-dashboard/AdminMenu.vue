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
            isActive: this.isMainPage
          },
          {
            path: "/admin/salon",
            title: "Salon Configuration",
            isActive: this.inSalonPage
          },
          {
            path: "/admin/masters",
            title: "Masters Configuration",
            isActive: this.inMastersPage
          }
        ]
      };
    },
    currentRoute() {
      return this.$route.path;
    },
    isMainPage() {
      return this.currentRoute === "/admin";
    },
    inSalonPage() {
      return this.currentRoute.includes("salon");
    },
    inMastersPage() {
      return this.currentRoute.includes("masters");
    }
  }
};
</script>

<style scoped lang="scss"></style>
