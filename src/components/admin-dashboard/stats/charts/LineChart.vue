<template>
  <div :class="$style['chart-container']">
    <canvas ref="myChart" />
  </div>
</template>

<script>
import fast from "fast.js";
import Chart from "chart.js/auto";

export default {
  name: "LineChart",
  data() {
    return {
      chartOptions: {
        resizeDelay: 350,
        layout: {
          padding: 35
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      chartItemAdditionalOptions: {
        label: "# of Votes",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        tension: 0.25
      },
      chartItemsData: [
        {
          label: "Red",
          data: 12
        },
        {
          label: "Blue",
          data: 30
        },
        {
          label: "Red",
          data: 12
        },
        {
          label: "Blue",
          data: 30
        },
        {
          label: "Red",
          data: 12
        },
        {
          label: "Blue",
          data: 30
        },
        {
          label: "Red",
          data: 12
        },
        {
          label: "Blue",
          data: 30
        },

        {
          label: "Red",
          data: 12
        },
        {
          label: "Blue",
          data: 30
        }
      ]
    };
  },
  mounted() {
    const myChartRef = this.$refs.myChart;
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: fast.map(this.chartItemsData, item => item.label, this),
        datasets: [
          {
            data: fast.map(this.chartItemsData, item => item.data, this),
            ...this.chartItemAdditionalOptions
          }
        ]
      },
      options: this.chartOptions
    });
  }
};
</script>

<style module lang="scss">
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
