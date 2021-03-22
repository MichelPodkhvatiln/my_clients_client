<template>
  <div class="container">
    <div class="columns pt-4">
      <div v-if="!isLoading" class="column is-6 is-offset-3">
        <h3 class="title is-3 has-text-centered">
          Selected salon: {{ salonName }}
        </h3>

        <div class="field">
          <label class="label">Master</label>
          <div class="select is-fullwidth">
            <select :disabled="!salonMasters.length">
              <option
                v-for="master in salonMasters"
                :key="master.value"
                :value="master.value"
                placeholder="Please, select your master"
              >
                {{ master.title }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RecordForm",
  props: {
    salonId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      salonInfo: null,
      mastersList: []
    };
  },
  async beforeMount() {
    try {
      this.isLoading = true;

      this.salonInfo = await this.getSalonById({
        salonId: this.salonId,
        withReturn: true
      });

      if (!this.salonInfo) return;

      this.mastersList = await this.getSalonMastersList({
        salonId: this.salonId,
        withReturn: true
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    salonName() {
      if (!this.salonInfo) return "";

      return this.salonInfo.name;
    },
    salonMasters() {
      if (!this.mastersList.length) return [];

      return this.mastersList.map(master => {
        return {
          title: `${master.userInfo.firstName} ${master.userInfo.lastName}`,
          value: master.id
        };
      });
    }
  },
  methods: {
    ...mapActions("salonModule", ["getSalonById"]),
    ...mapActions("mastersModule", ["getSalonMastersList"])
  }
};
</script>

<style scoped lang="scss"></style>
