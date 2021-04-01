<template>
  <div class="container">
    <div class="columns pt-4">
      <div v-if="!isLoading" class="column is-6 is-offset-3">
        <h3 class="title is-3 has-text-centered">
          Выбранный салон: {{ salonName }}
        </h3>

        <div class="field">
          <label class="label">Мастер</label>
          <div class="select is-fullwidth">
            <select :disabled="!salonMasters.length" @change="onMasterSelect">
              <option value="null">
                Выберите мастера
              </option>
              <option
                v-for="master in salonMasters"
                :key="master.value"
                :value="master.value"
              >
                {{ master.title }}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <label class="label">Услуга</label>
          <div class="select is-fullwidth">
            <select :disabled="!formData.master" @change="onServiceSelect">
              <option value="null">
                Выберите услугу
              </option>
              <option
                v-for="service in masterServices"
                :key="service.value"
                :value="service.value"
              >
                {{ service.title }}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <label class="label">Дата посещения</label>
          <date-picker
            :value="recordDate"
            :disabled="!formData.master"
            :disabled-date="disabledDate"
            placeholder="Выберете дату посещения"
            @clear="onClearDate"
            @pick="onSelectDate"
          />
        </div>

        <div class="field">
          <label class="label">Время</label>
          <div class="select is-fullwidth">
            <select
              :disabled="!formData.day || !recordTimes.length"
              @click="onRecordTimeSelect"
            >
              <option value="null">
                Выберите время
              </option>
              <option
                v-for="recordTime in recordTimes"
                :key="recordTime.value"
                :value="recordTime.value"
              >
                {{ recordTime.title }}
              </option>
            </select>
          </div>
        </div>

        <template v-if="!isUserLogIn">
          <div class="field">
            <label class="label">Имя</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="userForm.firstName"
                placeholder="Введите свое имя"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Фамилия</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="userForm.lastName"
                placeholder="Введите свою фамилию"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Телефон</label>
            <div class="control">
              <vue-tel-input @input="onPhoneInput" />
            </div>
          </div>
        </template>
        <div class="buttons is-flex is-justify-content-flex-end">
          <button class="button is-success" @click="onSubmit">
            Записаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "RecordForm",
  components: {
    DatePicker
  },
  props: {
    salonId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      masterInfo: null,
      salonInfo: null,
      servicesInfo: [],
      mastersList: [],
      formData: {
        master: null,
        service: null,
        date: null,
        day: null,
        time: null
      },
      userForm: {
        firstName: "",
        lastName: "",
        phone: ""
      }
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

      this.servicesInfo = await this.getServicesList(true);

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
    ...mapGetters("userModule", ["isUserLogIn", "user"]),
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
    },
    masterServices() {
      if (
        !this.servicesInfo.length ||
        !this.mastersList.length ||
        !this.masterInfo
      )
        return [];

      return this.servicesInfo
        .filter(service => this.masterInfo.services.includes(service._id))
        .map(service => {
          return {
            title: service.name,
            value: service._id
          };
        });
    },
    selectedMasterUserInfo() {
      if (!this.masterInfo) return;

      return {
        masterId: this.masterInfo?.id,
        firstName: this.masterInfo?.userInfo.firstName,
        lastName: this.masterInfo?.userInfo.lastName
      };
    },
    selectedServiceInfo() {
      if (!this.servicesInfo) return;

      const serviceInfo = this.servicesInfo.find(
        service => service._id === this.formData.service
      );

      if (!serviceInfo) return;

      return {
        name: serviceInfo.name,
        price: serviceInfo.price,
        comment: serviceInfo.comment
      };
    },
    recordDate() {
      return this.formData.date;
    },
    recordTimes() {
      if (!this.formData.day) return [];

      const allowedDatesInfo = [];

      this.masterInfo.datesInfo.forEach(dateInfo => {
        if (!dateInfo.recordInfo) {
          allowedDatesInfo.push({
            title: dateInfo.time,
            value: dateInfo._id
          });
          return;
        }

        const isAlreadyDateSelect = dateInfo.recordInfo.find(record => {
          const recordDate = moment(record.date).format("YYYY-MM-DD");
          const selectedDate = moment(this.formData.date).format("YYYY-MM-DD");

          return moment(recordDate).isSame(selectedDate);
        });

        if (isAlreadyDateSelect) return;

        allowedDatesInfo.push({
          title: dateInfo.time,
          value: dateInfo._id
        });
      });

      return allowedDatesInfo;
    }
  },
  methods: {
    ...mapActions("salonModule", ["getSalonById"]),
    ...mapActions("servicesModule", ["getServicesList"]),
    ...mapActions("mastersModule", ["getSalonMastersList", "getMasterById"]),
    ...mapActions("recordModule", ["addRecord"]),
    async onMasterSelect(evt) {
      const value = evt.target.value;

      if (value === "null") {
        this.masterInfo = null;
        this.formData.master = null;
        return;
      }

      try {
        this.masterInfo = await this.getMasterById(value);
        this.formData.master = value;
      } catch (err) {
        console.error(err);
      }
    },
    onServiceSelect(evt) {
      const value = evt.target.value;

      if (value === "null") {
        this.formData.service = null;
        return;
      }

      this.formData.service = value;
    },
    disabledDate(date) {
      if (!date) return true;

      const dayCodeValues = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
      const mastersWorkDays = this.masterInfo.workDays;

      const dayCode = moment(date).format("dd");

      const dayIndex = dayCodeValues.findIndex(day => day === dayCode);

      if (dayIndex < 0) return true;

      return !mastersWorkDays.includes(dayIndex + 1);
    },
    onSelectDate(date) {
      this.formData.date = date;

      const dayCodeValues = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
      const dayCode = moment(date).format("dd");

      const dayIndex = dayCodeValues.findIndex(day => day === dayCode);

      if (dayIndex < 0) return;

      this.formData.day = dayIndex + 1;
    },
    onClearDate() {
      this.formData.date = null;
      this.formData.day = null;
    },
    onRecordTimeSelect(evt) {
      const value = evt.target.value;

      if (value === "null") {
        this.formData.time = null;
        return;
      }

      this.formData.time = value;
    },
    onPhoneInput(_, phoneObject) {
      if (phoneObject.valid) {
        this.userForm.phone = phoneObject.number;
      } else {
        this.userForm.phone = "";
      }
    },
    async onSubmit() {
      const recordData = {
        dateInfoId: this.formData.time,
        salonInfo: {
          name: this.salonName
        },
        masterInfo: {
          masterId: this.selectedMasterUserInfo?.masterId,
          firstName: this.selectedMasterUserInfo?.firstName,
          lastName: this.selectedMasterUserInfo?.lastName
        },
        serviceInfo: this.selectedServiceInfo
          ? { ...this.selectedServiceInfo }
          : undefined,
        userInfo: {
          firstName: this.isUserLogIn
            ? this.user.profile.firstName
            : this.userForm.firstName,
          lastName: this.isUserLogIn
            ? this.user.profile.lastName
            : this.userForm.lastName,
          phone: this.isUserLogIn
            ? this.user.profile.phone
            : this.userForm.phone
        },
        date: moment(this.formData.date)
          .utcOffset(0, true)
          .toDate()
      };

      try {
        await this.addRecord(recordData);
        await this.$router.push({
          name: "SuccessPage",
          params: { infoText: "Запись прошла успешно!" }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep {
  .mx-datepicker {
    width: 100%;
  }
}
</style>
