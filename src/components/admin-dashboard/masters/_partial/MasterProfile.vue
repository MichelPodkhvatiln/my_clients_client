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
    <template v-if="!isLoading">
      <div class="container is-fluid">
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
                  <div class="is-flex is-align-items-center">
                    <div
                      class="master__avatar--wrapper has-background-primary mr-4"
                    >
                      <avatar-icon class="master__avatar--icon" />
                    </div>

                    <div>
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
                    </div>
                  </div>
                </template>
              </div>

              <div class="buttons">
                <button class="button is-small is-info" @click="onChangeInfo">
                  Change info
                </button>
                <button class="button is-small is-info" @click="onChangeEmail">
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
                <button
                  class="button is-small is-info"
                  @click="onChangePassword"
                >
                  Change password
                </button>
              </div>
            </div>
          </article>
        </template>

        <template v-if="activeTab === 2">
          <article class="message is-dark">
            <div class="message-header">
              <p>Master's salon</p>
            </div>

            <div
              class="message-body is-flex is-align-items-center is-justify-content-space-between"
            >
              <p>Current master's salon:</p>

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
          </article>

          <article class="message is-dark">
            <div class="message-header">
              <p>Work days</p>
            </div>

            <div
              class="message-body is-flex is-align-items-center is-justify-content-space-between"
            >
              <div
                v-for="checkboxValue in daysValues"
                :key="checkboxValue.value"
                class="field"
              >
                <input
                  class="is-checkradio is-info"
                  :id="checkboxValue.title"
                  type="checkbox"
                  :value="checkboxValue.value"
                  :checked="isSelectedWorkDay(checkboxValue.value)"
                  @change="onWorkDayChange"
                />
                <label :for="checkboxValue.title">
                  {{ checkboxValue.title }}
                </label>
              </div>
            </div>
          </article>

          <article class="message is-dark">
            <div class="message-header">
              <p>Add record time</p>
            </div>

            <div class="message-body">
              <div class="is-flex is-flex-direction-column">
                <div
                  class="is-flex is-align-items-center is-justify-content-space-between mb-2"
                >
                  <p>Select day:</p>

                  <div class="select">
                    <select @change="onSelectTimesDay">
                      <option value="null" :selected="isSelectedTimesDay(null)">
                        Select day
                      </option>
                      <option
                        v-for="day in daysValues"
                        :key="day.value"
                        :value="day.value"
                        :selected="isSelectedTimesDay(day.value)"
                      >
                        {{ day.title }}
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  class="is-flex is-align-items-center is-justify-content-space-between mb-2"
                >
                  <p>Select time:</p>

                  <time-picker
                    :key="recordTimes.timepickerKey"
                    :hour-range="[[9, 18]]"
                    :minute-interval="15"
                    :disabled="!canSelectAvailableTime"
                    @onSetTime="onSetTime"
                  />
                </div>

                <div class="buttons is-flex is-justify-content-flex-end">
                  <button
                    class="button is-small is-success"
                    :disabled="!canAddAvailableTime"
                    @click="onAddAvailableTime"
                  >
                    Add time
                  </button>
                </div>
              </div>
            </div>
          </article>

          <article class="message is-dark">
            <div class="message-header">
              <p>Available record times</p>
            </div>

            <div class="message-body">
              Test
            </div>
          </article>
        </template>
        <template v-if="activeTab === 3">
          <article class="message is-dark">
            <div class="message-header">
              <p>Master's services</p>
            </div>

            <div class="message-body is-flex is-flex-direction-column">
              <div
                v-for="serviceInfo in servicesInfoList"
                :key="serviceInfo.value"
                class="field"
              >
                <input
                  class="is-checkradio is-info"
                  :id="serviceInfo.value"
                  type="checkbox"
                  :value="serviceInfo.value"
                  :checked="isSelectedService(serviceInfo.value)"
                  @change="onServiceChange"
                />
                <label :for="serviceInfo.value">
                  {{ serviceInfo.title }}
                </label>
              </div>
            </div>
          </article>
        </template>
      </div>
    </template>
    <template v-else>
      <div
        class="loader-container container is-fluid is-flex is-align-items-center is-justify-content-center"
      >
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#00d1b2"
        />
      </div>
    </template>

    <master-info-edit-modal />
    <master-email-edit-modal />
    <master-change-password-modal />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import debounce from "lodash.debounce";
import { HalfCircleSpinner } from "epic-spinners";
import AvatarIcon from "@/components/icons/AvatarIcon.vue";
import MasterInfoEditModal from "@/components/admin-dashboard/masters/_partial/MasterInfoEditModal.vue";
import MasterEmailEditModal from "@/components/admin-dashboard/masters/_partial/MasterEmailEditModal.vue";
import MasterChangePasswordModal from "@/components/admin-dashboard/masters/_partial/MasterChangePasswordModal.vue";
import TimePicker from "@/components/shared/TimePicker.vue";

export default {
  name: "MasterProfile",
  components: {
    HalfCircleSpinner,
    AvatarIcon,
    MasterInfoEditModal,
    MasterEmailEditModal,
    MasterChangePasswordModal,
    TimePicker
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
      },
      recordTimes: {
        timepickerKey: 0,
        selectedTime: "",
        selectedDay: null
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
    daysValues() {
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
    },
    canSelectAvailableTime() {
      return !!this.recordTimes.selectedDay;
    },
    canAddAvailableTime() {
      return (
        !!this.recordTimes.selectedDay && !!this.recordTimes.selectedTime.length
      );
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
  watch: {
    activeTab() {
      this.resetRecordTimes();
    }
  },
  methods: {
    ...mapActions("mastersModule", [
      "getMasterById",
      "changeMasterInfo",
      "changeMasterEmail",
      "changeMasterPassword",
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
        masterId: this.initialData.masterInfo.id,
        onSave: async (masterId, updatedInfo) => {
          try {
            this.initialData.masterInfo = await this.changeMasterInfo({
              masterId,
              updatedInfo
            });
          } catch (error) {
            console.error();
          } finally {
            this.$modal.hide("master-edit-info");
          }
        }
      });
    },
    onChangeEmail() {
      if (!this.userInfo) {
        return;
      }

      this.$modal.show("master-edit-email", {
        email: this.userInfo.email,
        masterId: this.initialData.masterInfo.id,
        onSave: async (masterId, updatedData) => {
          try {
            this.initialData.masterInfo = await this.changeMasterEmail({
              masterId,
              updatedData
            });
          } catch (error) {
            console.error();
          } finally {
            this.$modal.hide("master-edit-email");
          }
        }
      });
    },
    onChangePassword() {
      if (!this.initialData.masterInfo) {
        return;
      }

      this.$modal.show("master-change-password", {
        masterId: this.initialData.masterInfo.id,
        onSave: async (masterId, updatedData) => {
          try {
            this.initialData.masterInfo = await this.changeMasterPassword({
              masterId,
              updatedData
            });
          } catch (error) {
            console.error();
          } finally {
            this.$modal.hide("master-change-password");
          }
        }
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
    },
    onSelectTimesDay(evt) {
      const dayValue = evt.target.value;

      if (dayValue === "null") {
        this.recordTimes.selectedDay = null;
        return;
      }

      this.recordTimes.selectedDay = Number(dayValue);
    },
    onSetTime(timeValue) {
      this.recordTimes.selectedTime = timeValue;
    },
    isSelectedTimesDay(value) {
      return this.recordTimes.selectedDay === value;
    },
    resetRecordTimes() {
      this.recordTimes.timepickerKey++;
      this.recordTimes.selectedDay = null;
      this.recordTimes.selectedTime = "";
    },
    onAddAvailableTime() {
      this.resetRecordTimes();
    }
  }
};
</script>

<style scoped lang="scss">
.loader-container {
  height: calc(100vh - 170px);
}

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
  width: 100%;
  max-width: 300px;

  select {
    width: 100%;
  }
}

.master__avatar--wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
}

.master__avatar--icon {
  width: 40px;
  height: 40px;
  fill: #ffffff;
}
</style>
