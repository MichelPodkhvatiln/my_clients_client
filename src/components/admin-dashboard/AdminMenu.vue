<template>
  <aside class="menu admin-menu">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li><a @click.prevent="onSalonConfigClick">Salon Configuration</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "AdminMenu",
  methods: {
    onSalonConfigClick() {
      console.log("onSalonConfigClick");
    },
  },
};
</script>

<style scoped lang="scss">
.admin-menu {
  padding: 15px;
  min-width: 200px;
  height: 100%;
}
</style>
