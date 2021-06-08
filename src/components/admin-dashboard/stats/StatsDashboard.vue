<template>
  <section class="stats-dashboard">
    <header class="stats-dashboard__header">
      <div class="stats-dashboard__header--title">
        <h1 class="title">
          Статистика по салону
        </h1>
      </div>
    </header>

    <div class="container is-fluid">
      <div class="columns is-desktop">
        <div class="column">
          <line-chart
            v-if="recordWeekStats"
            chart-title="Прибыль за неделю"
            chart-label="Прибыль за день"
            :chart-items-data="formattedRecordWeekStats()"
          />
        </div>
        <div class="column">
          <line-chart
            v-if="recordMonthStats"
            chart-title="Прибыль за месяц"
            chart-label="Прибыль за день"
            :chart-items-data="formattedRecordMonthStats()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import LineChart from "@/components/admin-dashboard/stats/charts/LineChart";

moment.locale("ru");

export default {
  name: "StatsConfig",
  components: { LineChart },
  data() {
    return {
      recordWeekStats: null,
      recordMonthStats: null
    };
  },
  async mounted() {
    try {
      this.recordWeekStats = await this.getRecordWeekStats();
      this.recordMonthStats = await this.getRecordMonthStats();
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    ...mapActions("statsModule", ["getRecordWeekStats", "getRecordMonthStats"]),
    formattedRecordWeekStats() {
      if (!this.recordWeekStats) return [];

      return this.recordWeekStats.map(item => ({
        label: moment(item.date).format("DD MMMM YYYY"),
        value: item.price
      }));
    },
    formattedRecordMonthStats() {
      if (!this.recordMonthStats) return [];

      return this.recordMonthStats.map(item => ({
        label: moment(item.date).format("DD MMMM YYYY"),
        value: item.price
      }));
    }
  }
};
</script>

<style scoped lang="scss">
@import "./src/scss/mixins";

.stats-dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  @include scrollBar();
}

.stats-dashboard__header {
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
</style>
