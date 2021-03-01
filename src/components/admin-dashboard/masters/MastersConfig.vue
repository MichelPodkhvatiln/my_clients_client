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

    <ul v-if="mastersList.length" class="masters-config__list">
      <li
        v-for="master in mastersList"
        :key="master.id"
        class="masters-config__list--item"
      >
        <master-list-item :master="master" />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MasterListItem from "@/components/admin-dashboard/masters/_partial/MasterListItem.vue";

export default {
  name: "MastersConfig",
  components: {
    PlusIcon,
    MasterListItem
  },
  async beforeMount() {
    try {
      await this.getMastersList();
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    ...mapGetters("mastersModule", ["mastersList"])
  },
  methods: {
    ...mapActions("mastersModule", ["getMastersList"])
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
