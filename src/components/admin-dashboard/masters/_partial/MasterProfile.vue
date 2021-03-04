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
    <div v-if="!isLoading" class="block">
      <template v-if="activeTab === 1">
        <div class="field">
          <label class="label">First name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="editedData.editableMasterInfo.firstName"
              placeholder="First name"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Last name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="editedData.editableMasterInfo.lastName"
              placeholder="Last name"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              v-model="editedData.editableMasterInfo.email"
              placeholder="Email"
            />
          </div>
        </div>

        <div class="field is-flex is-justify-content-flex-end">
          <div class="buttons">
            <button class="button is-success">
              Save
            </button>
            <button class="button is-danger">
              Cancel
            </button>
          </div>
        </div>
      </template>

      <template v-if="activeTab === 2">
        <div class="field">
          <label class="label">Master salon</label>
          <div class="select">
            <select @change="onChangeSalon">
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
        <div class="field is-flex is-flex-direction-column">
          <label class="label">Days:</label>

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
  </section>
</template>

<script>
import { mapActions } from "vuex";
import debounce from "lodash.debounce";

export default {
  name: "MasterProfile",
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
        editableMasterInfo: {
          firstName: "",
          lastName: "",
          email: ""
        },
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
      this.editedData.editableMasterInfo = {
        firstName: masterInfo.userInfo.firstName,
        lastName: masterInfo.userInfo.lastName,
        email: masterInfo.userInfo.email,
        salonInfo: masterInfo.salonInfo.id
      };
      this.editedData.workDays = masterInfo.workDays ?? [];
      this.editedData.masterServices = masterInfo.services ?? [];
    },
    async onChangeSalon(evt) {
      const masterId = this.$route.params.masterId;
      const salonId = evt.target.value;

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
  width: 100%;
  height: 100%;
}

.master-profile__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 15px;
  min-height: 60px;
}

.select {
  width: 250px;

  select {
    width: 100%;
  }
}
</style>
