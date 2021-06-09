<template>
  <div :class="$style['chart-container']">
    <canvas ref="myChart" />
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineChart",
  props: {
    chartItemsData: {
      type: Array,
      default: () => []
    },
    chartTitle: {
      type: String,
      default: ""
    },
    chartLabel: {
      type: String,
      default: ""
    },
    lineColor: {
      type: String,
      default: "#ff7050cc"
    }
  },
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
        },
        parsing: {
          xAxisKey: "label",
          yAxisKey: "value"
        }
      },
      chartItemAdditionalOptions: {
        borderWidth: 1,
        tension: 0.25
      }
    };
  },
  mounted() {
    const myChartRef = this.$refs.myChart;
    new Chart(myChartRef, {
      type: "line",
      data: {
        datasets: [
          {
            label: this.chartLabel,
            data: this.chartItemsData,
            backgroundColor: `${this.lineColor}`,
            borderColor: `${this.lineColor}`,
            ...this.chartItemAdditionalOptions
          }
        ]
      },
      options: {
        ...this.chartOptions,
        plugins: {
          title: {
            display: true,
            text: this.chartTitle,
            padding: {
              top: 10,
              bottom: 15
            }
          }
        }
      }
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
