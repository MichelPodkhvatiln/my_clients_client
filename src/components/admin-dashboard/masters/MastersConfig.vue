<template>
  <section class="masters-config">
    <header class="masters-config__header">
      <div class="masters-config__header--title">
        <h1 class="title">
          Masters management
        </h1>
      </div>
      <div class="masters-config__header--buttons">
        <button class="button is-link button-with-icon">
          Add new master

          <plus-icon class="button-icon" />
        </button>
      </div>
    </header>

    <ul class="masters-config__list">
      <li class="masters-config__list--item">
        <master-list-item />
      </li>
      <li class="masters-config__list--item">
        <master-list-item />
      </li>
      <li class="masters-config__list--item">
        <master-list-item />
      </li>
    </ul>
  </section>
</template>

<script>
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MasterListItem from "@/components/admin-dashboard/masters/_partial/MasterListItem.vue";

export default {
  name: "MastersConfig",
  components: {
    PlusIcon,
    MasterListItem
  }
};
</script>

<style scoped lang="scss">
.masters-config {
  width: 100%;
  height: 100%;
}

.masters-config__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 15px;
  min-height: 60px;
}

.masters-config__list {
  list-style: none;
}

.masters-config__list--item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.button-with-icon {
  position: relative;
  padding-right: 30px;
}

.button-icon {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: #ffffff;
}
</style>
