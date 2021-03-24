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
            :lang="lang"
            :value="recordDate"
            :disabled="!formData.master"
            :disabled-date="disabledDate"
            placeholder="Выберете дату посещения"
            @clear="onClearDate"
            @pick="onSelectDate"
          />
        </div>

        {{ formData }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      salonInfo: null,
      servicesInfo: [],
      mastersList: [],
      masterInfo: null,
      formData: {
        master: null,
        service: null,
        date: null
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
    recordDate() {
      return this.formData.date;
    }
  },
  methods: {
    ...mapActions("salonModule", ["getSalonById"]),
    ...mapActions("servicesModule", ["getServicesList"]),
    ...mapActions("mastersModule", ["getSalonMastersList", "getMasterById"]),
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
    },
    onClearDate() {
      this.formData.date = null;
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
