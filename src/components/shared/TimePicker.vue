<template>
  <vue-timepicker
    class="timepicker"
    :minute-interval="minuteInterval"
    :hour-range="hourRange"
    :disabled="disabled"
    hour-label="Hour"
    minute-label="Minute"
    hide-disabled-hours
    close-on-complete
    @change="onChangeTime"
  />
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  name: "TimePicker",
  components: {
    VueTimepicker
  },
  props: {
    hourRange: {
      type: Array,
      default: () => [[0, 24]]
    },
    minuteInterval: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChangeTime(eventData) {
      const hourValue = eventData.data.hh;
      const minuteValue = eventData.data.mm;

      if (!hourValue.length || !minuteValue.length) {
        this.$emit("onSetTime", "");
        return;
      }

      this.$emit("onSetTime", eventData.displayTime);
    }
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

      &:not(:disabled) {
        &:hover,
        &:focus {
          border-color: #3273dc;
        }
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
        background-color: #3273dc !important;
      }
    }
  }
}
</style>
