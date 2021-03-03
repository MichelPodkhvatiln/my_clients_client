<template>
  <section class="master-profile">
    <header class="master-profile__header">
      <div class="master-profile__header--title">
        <h1 class="title">
          Masters profile
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

        <div class="field">
          <label class="label">New password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="editedData.editableMasterInfo.newPassword"
              placeholder="New password"
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
        <div class="field is-flex is-flex-direction-column">
          <label class="label">Days:</label>

          <label
            v-for="checkboxValue in checkboxDaysValues"
            :key="checkboxValue.value"
            class="checkbox mb-2"
          >
            <input
              type="checkbox"
              v-model.number="editedData.masterDays"
              :value="checkboxValue.value"
            />
            {{ checkboxValue.title }}
          </label>
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
              v-model.number="editedData.masterServices"
              :value="serviceInfo.value"
            />
            {{ serviceInfo.title }}
          </label>
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
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

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
          email: "",
          newPassword: ""
        },
        newSalonId: null,
        masterDays: [],
        masterServices: []
      }
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
    const userId = this.$route.params.masterId;

    if (!userId) return;

    this.isLoading = true;

    try {
      this.initialData.masterInfo = await this.getMasterById(userId);
      this.initialData.salonsInfo = await this.getSalonList(true);
      this.initialData.servicesInfo = await this.getServicesList(true);

      //TODO make more clearly server response
      this.editedData.editableMasterInfo.firstName = this.initialData.masterInfo.user.profile.firstName;
      this.editedData.editableMasterInfo.lastName = this.initialData.masterInfo.user.profile.lastName;
      this.editedData.editableMasterInfo.email = this.initialData.masterInfo.user.email;
      this.editedData.masterServices = this.initialData.masterInfo.services;
    } catch (error) {
      console.error(error);
    }

    this.isLoading = false;
  },
  methods: {
    ...mapActions("mastersModule", ["getMasterById"]),
    ...mapActions("salonModule", ["getSalonList"]),
    ...mapActions("servicesModule", ["getServicesList"]),
    onBackClick() {
      this.$router.push("/admin/masters");
    },
    changeActiveTab(tabId) {
      this.activeTab = tabId;
    },
    onChangeSalon(evt) {
      this.editedData.newSalonId = evt.target.value;
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
