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

    <div class="container is-fluid">
      <ul v-if="mastersList.length">
        <li v-for="master in mastersList" :key="master.id" class="mb-2">
          <master-list-item :master="master" />
        </li>
      </ul>
    </div>

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
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.masters-config__header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 15px;
  height: 60px;
  background-color: #fdfdfd;
  box-shadow: 0 3px 4px 0 rgba(#000000, 0.1), 0 3px 3px -2px rgba(#000000, 0.07),
    0 1px 8px 0 rgba(#000000, 0.006);
}
</style>
