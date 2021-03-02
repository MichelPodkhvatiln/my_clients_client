<template>
  <modal
    name="master-modal"
    :minWidth="600"
    height="auto"
    :clickToClose="true"
    @before-open="beforeOpen"
  >
    <section class="master-form">
      <div class="tabs">
        <ul>
          <li
            :class="{ 'is-active': this.activeTab === 1 }"
            @click.prevent="changeActiveTab(1)"
          >
            <a>Profile</a>
          </li>
          <li
            :class="{ 'is-active': this.activeTab === 2 }"
            @click.prevent="changeActiveTab(2)"
          >
            <a>Salon</a>
          </li>
          <li
            :class="{ 'is-active': this.activeTab === 3 }"
            @click.prevent="changeActiveTab(3)"
          >
            <a>Services</a>
          </li>
        </ul>
      </div>

      <div class="block">
        <template v-if="activeTab === 1">
          <div class="field">
            <label class="label">First name</label>
            <div class="control">
              <input class="input" type="text" placeholder="First name" />
            </div>
          </div>

          <div class="field">
            <label class="label">Last name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Last name" />
            </div>
          </div>

          <div class="field">
            <label class="label">New password</label>
            <div class="control">
              <input class="input" type="password" placeholder="New password" />
            </div>
          </div>
        </template>

        <template v-if="activeTab === 2">
          <div class="field">
            <label class="label">Selected salon</label>
            <div class="select">
              <select @change="onChangeSalon">
                <option value="null">None</option>
                <option
                  v-for="salon in salonsWithStatus"
                  :key="salon._id"
                  :value="salon._id"
                  :selected="salon.isSelected"
                >
                  {{ salon.name }}
                </option>
              </select>
            </div>
          </div>

          <!--          {{ salonsWithStatus }}-->
        </template>

        <template v-if="activeTab === 3">
          Friends
        </template>

        <!--        <template v-if="masterInfo">-->
        <!--          {{ masterInfo }}-->
        <!--        </template>-->
      </div>
    </section>
  </modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MasterModal",
  data() {
    return {
      initialData: {
        masterInfo: null,
        salonsInfo: null
      },

      activeTab: 1 //1, 2, 3
    };
  },
  computed: {
    salonsWithStatus() {
      if (!this.initialData.salonsInfo?.length) {
        return [];
      }

      const masterSalonId = this.initialData.masterInfo?.salon?._id;

      return this.initialData.salonsInfo.map(salon => {
        const isSelected = salon._id === masterSalonId;

        return {
          ...salon,
          isSelected
        };
      });
    }
  },
  methods: {
    ...mapActions("mastersModule", ["getMasterById"]),
    ...mapActions("salonModule", ["getSalonList"]),
    async beforeOpen(event) {
      const params = event.params;

      if (!params?.id) {
        event.cancel();
        return;
      }

      try {
        this.initialData.masterInfo = await this.getMasterById(params.id);
        this.initialData.salonsInfo = await this.getSalonList(true);
      } catch (error) {
        console.error(error);
      }
    },
    changeActiveTab(tabId) {
      this.activeTab = tabId;
    },
    onChangeSalon(evt) {
      const value = evt.target.value;

      console.log(value);
    }
  }
};
</script>

<style scoped lang="scss">
.master-form {
  min-height: 400px;
}

.block {
  padding: 10px 15px;
}

.select {
  width: 100%;

  select {
    width: 100%;
  }
}
</style>
