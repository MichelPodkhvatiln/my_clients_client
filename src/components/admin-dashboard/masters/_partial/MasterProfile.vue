<template>
  <section class="master-profile">
    <header class="master-profile__header">
      <div class="master-profile__header--title">
        <h1 class="title">
          Masters configuration
        </h1>
      </div>
      <div class="master-profile__header--buttons">
        <button class="button is-link" @click="onBackClick">
          Back
        </button>
      </div>
    </header>
    <div class="tabs">
      <ul>
        <li
          :class="{ 'is-active': this.activeTab === 1 }"
          @click.prevent="changeActiveTab(1)"
        >
          <a>Profile configuration</a>
        </li>
        <li
          :class="{ 'is-active': this.activeTab === 2 }"
          @click.prevent="changeActiveTab(2)"
        >
          <a>Salon configuration</a>
        </li>
        <li
          :class="{ 'is-active': this.activeTab === 3 }"
          @click.prevent="changeActiveTab(3)"
        >
          <a>Services configuration</a>
        </li>
      </ul>
    </div>
    <div v-if="!isLoading" class="container is-fluid">
      <template v-if="activeTab === 1">
        <article class="message is-dark">
          <div class="message-header">
            <p>Profile info</p>
          </div>

          <div
            class="message-body is-flex is-align-items-center is-justify-content-space-between"
          >
            <div>
              <template v-if="userInfo">
                <p class="is-size-6">
                  First name:
                  <strong>
                    {{ userInfo.firstName }}
                  </strong>
                </p>

                <p class="is-size-6">
                  Last name:
                  <strong>
                    {{ userInfo.lastName }}
                  </strong>
                </p>

                <p class="is-size-6">
                  Email:
                  <strong>
                    {{ userInfo.email }}
                  </strong>
                </p>
              </template>
            </div>

            <div class="buttons">
              <button class="button is-small is-info" @click="onChangeInfo">
                Change info
              </button>
              <button class="button is-small is-info">
                Change email
              </button>
            </div>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>Account security</p>
          </div>

          <div
            class="message-body is-flex is-align-items-center is-justify-content-space-between"
          >
            <p>Password settings</p>
            <div class="buttons">
              <button class="button is-small is-info">
                Change password
              </button>
            </div>
          </div>
        </article>
      </template>

      <template v-if="activeTab === 2">
        <div class="field">
          <label class="label">Master's salon</label>
          <div class="select">
            <select @change="onChangeSalon">
              <option
                value="null"
                :selected="!initialData.masterInfo.salonInfo"
              >
                None
              </option>
              <template v-if="salonsWithStatus.length">
                <option
                  v-for="salon in salonsWithStatus"
                  :key="salon._id"
                  :value="salon._id"
                  :selected="salon.isSelected"
                >
                  {{ salon.name }}
                </option>
              </template>
            </select>
          </div>
        </div>
        <div class="field is-flex is-flex-direction-column">
          <label class="label">Work days:</label>

          <label
            v-for="checkboxValue in checkboxDaysValues"
            :key="checkboxValue.value"
            class="checkbox mb-2"
          >
            <input
              type="checkbox"
              :value="checkboxValue.value"
              :checked="isSelectedWorkDay(checkboxValue.value)"
              @change="onWorkDayChange"
            />
            {{ checkboxValue.title }}
          </label>
        </div>
      </template>
      <template v-if="activeTab === 3">
        <div class="field is-flex is-flex-direction-column">
          <label class="label">Master services:</label>

          <label
            v-for="serviceInfo in servicesInfoList"
            :key="serviceInfo.value"
            class="checkbox mb-2"
          >
            <input
              type="checkbox"
              :value="serviceInfo.value"
              :checked="isSelectedService(serviceInfo.value)"
              @change="onServiceChange"
            />
            {{ serviceInfo.title }}
          </label>
        </div>
      </template>
    </div>

    <master-info-edit-modal />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import debounce from "lodash.debounce";
import MasterInfoEditModal from "@/components/admin-dashboard/masters/_partial/MasterInfoEditModal.vue";

export default {
  name: "MasterProfile",
  components: {
    MasterInfoEditModal
  },
  data() {
    return {
      activeTab: 1, //1, 2, 3
      isLoading: false,
      initialData: {
        masterInfo: null,
        salonsInfo: null,
        servicesInfo: null
      },
      editedData: {
        salonInfo: null,
        workDays: [],
        masterServices: []
      }
    };
  },
  computed: {
    salonsWithStatus() {
      if (!this.initialData.salonsInfo?.length) {
        return [];
      }

      const masterSalonId = this.initialData.masterInfo?.salonInfo?.id;

      return this.initialData.salonsInfo.map(salon => {
        const isSelected = salon._id === masterSalonId;

        return {
          ...salon,
          isSelected
        };
      });
    },
    checkboxDaysValues() {
      return [
        {
          title: "Monday",
          value: 1
        },
        {
          title: "Tuesday",
          value: 2
        },
        {
          title: "Wednesday",
          value: 3
        },
        {
          title: "Thursday",
          value: 4
        },
        {
          title: "Friday",
          value: 5
        },
        {
          title: "Saturday",
          value: 6
        },
        {
          title: "Sunday",
          value: 7
        }
      ];
    },
    servicesInfoList() {
      const servicesInfo = this.initialData.servicesInfo;

      if (!servicesInfo) {
        return [];
      }

      return servicesInfo.map(service => {
        return {
          title: service.name,
          value: service._id
        };
      });
    },
    userInfo() {
      if (!this.initialData.masterInfo) {
        return undefined;
      }

      return {
        firstName: this.initialData.masterInfo.userInfo.firstName,
        lastName: this.initialData.masterInfo.userInfo.lastName,
        email: this.initialData.masterInfo.userInfo.email
      };
    }
  },
  async beforeMount() {
    const masterId = this.$route.params.masterId;

    if (!masterId) return;

    this.isLoading = true;

    try {
      await this.getMasterInfo(masterId);
    } catch (error) {
      console.error(error);
    }

    this.isLoading = false;
  },
  methods: {
    ...mapActions("mastersModule", [
      "getMasterById",
      "changeMasterSalon",
      "changeMasterWorkdays",
      "changeMasterServices"
    ]),
    ...mapActions("salonModule", ["getSalonList"]),
    ...mapActions("servicesModule", ["getServicesList"]),
    onBackClick() {
      this.$router.push("/admin/masters");
    },
    changeActiveTab(tabId) {
      this.activeTab = tabId;
    },
    isSelectedWorkDay(value) {
      return this.editedData.workDays.includes(value);
    },
    isSelectedService(value) {
      return this.editedData.masterServices.includes(value);
    },
    async getMasterInfo(masterId) {
      try {
        this.initialData.masterInfo = await this.getMasterById(masterId);
        this.initialData.salonsInfo = await this.getSalonList(true);
        this.initialData.servicesInfo = await this.getServicesList(true);

        this.setMasterInfoData(this.initialData.masterInfo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    setMasterInfoData(masterInfo) {
      this.editedData.salonInfo = masterInfo.salonInfo?.id ?? null;
      this.editedData.workDays = masterInfo.workDays ?? [];
      this.editedData.masterServices = masterInfo.services ?? [];
    },
    onChangeInfo() {
      if (!this.userInfo) {
        return;
      }

      this.$modal.show("master-edit-info", {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        masterId: this.initialData.masterInfo.id
      });
    },
    async onChangeSalon(evt) {
      const formattedValue =
        evt.target.value === "null"
          ? JSON.parse(evt.target.value)
          : evt.target.value;

      const masterId = this.$route.params.masterId;
      const salonId = formattedValue;

      const params = {
        masterId,
        salonId
      };

      try {
        this.initialData.masterInfo = await this.changeMasterSalon(params);
      } catch (error) {
        console.error(error);
      }
    },
    onWorkDayChange(evt) {
      const _debouncedWorkDayUpdate = debounce(async () => {
        const params = {
          masterId: this.$route.params.masterId,
          workDays: this.editedData.workDays
        };

        try {
          this.initialData.masterInfo = await this.changeMasterWorkdays(params);
        } catch (error) {
          console.error(error);
        }
      }, 500);

      const value = Number(evt.target.value);
      const index = this.editedData.workDays.indexOf(value);

      if (index !== -1) {
        this.editedData.workDays.splice(index, 1);
        _debouncedWorkDayUpdate();
        return;
      }

      this.editedData.workDays.push(value);
      _debouncedWorkDayUpdate();
    },
    onServiceChange(evt) {
      const _debouncedServicesUpdate = debounce(async () => {
        const params = {
          masterId: this.$route.params.masterId,
          services: this.editedData.masterServices
        };

        try {
          this.initialData.masterInfo = await this.changeMasterServices(params);
        } catch (error) {
          console.error(error);
        }
      }, 500);

      const value = evt.target.value;
      const index = this.editedData.masterServices.indexOf(value);

      if (index !== -1) {
        this.editedData.masterServices.splice(index, 1);
        _debouncedServicesUpdate();
        return;
      }

      this.editedData.masterServices.push(value);
      _debouncedServicesUpdate();
    }
  }
};
</script>

<style scoped lang="scss">
.master-profile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.master-profile__header {
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

.select {
  width: 250px;

  select {
    width: 100%;
  }
}
</style>
