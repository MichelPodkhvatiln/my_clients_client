<template>
  <section class="stats-dashboard">
    <header class="stats-dashboard__header">
      <div class="stats-dashboard__header--title">
        <h1 class="title">
          Статистика по салону
        </h1>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  name: "StatsConfig"
};
</script>

<style scoped lang="scss">
@import "./src/scss/mixins";

.stats-dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  @include scrollBar();
}

.stats-dashboard__header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 15px;
  height: 60px;
  background-color: #fdfdfd;
  box-shadow: 0 3px 4px 0 rgba(#000000, 0.1), 0 3px 3px -2px rgba(#000000, 0.07),
    0 1px 8px 0 rgba(#000000, 0.006);
}
</style>
