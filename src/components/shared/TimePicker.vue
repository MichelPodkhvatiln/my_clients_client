<template>
  <vue-timepicker class="timepicker" />
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  name: "TimePicker",
  components: {
    VueTimepicker
  }
};
</script>

<style scoped lang="scss">
.timepicker {
  ::v-deep {
    .display-time {
      height: 40px;
      color: #363636;
      background-color: #ffffff;
      border-color: #dbdbdb;
      border-radius: 4px;
      outline: none;
      transition: 0.2s ease-out;

      &:hover,
      &:focus {
        border-color: #00d1b2;
      }
    }

    .char {
      opacity: 0.6;
      color: #3273dc;
      transition: opacity 0.2s ease-out;
      -webkit-margin-before: 0;
    }

    .clear-btn {
      &:hover {
        .char {
          opacity: 1;
        }
      }
    }

    .select-list {
      ul {
        margin-right: -18px;
        background-color: #ffffff;
      }

      .active {
        background-color: #00d1b2 !important;
      }
    }
  }
}
</style>
