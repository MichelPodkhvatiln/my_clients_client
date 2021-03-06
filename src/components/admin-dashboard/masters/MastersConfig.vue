<template>
  <section class="masters-config">
    <header class="masters-config__header">
      <div class="masters-config__header--title">
        <h1 class="title">
          Masters management
        </h1>
      </div>
      <div class="masters-config__header--buttons">
        <button class="button is-link" @click="onAddMasterClick">
          Add new master
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

    <master-add-modal />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MasterListItem from "@/components/admin-dashboard/masters/_partial/MasterListItem.vue";
import MasterAddModal from "@/components/admin-dashboard/masters/_partial/MasterAddModal.vue";

export default {
  name: "MastersConfig",
  components: {
    MasterListItem,
    MasterAddModal
  },
  async beforeMount() {
    try {
      await this.getMastersList();
    } catch (error) {
      console.error(error);
    }
  },
  beforeDestroy() {
    this.resetState();
  },
  computed: {
    ...mapGetters("mastersModule", ["mastersList"])
  },
  methods: {
    ...mapActions("mastersModule", ["resetState", "getMastersList"]),
    onAddMasterClick() {
      this.$modal.show("add-master");
    }
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
</style>
