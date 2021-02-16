<template>
  <button
    class="button"
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    type: {
      type: String,
      default: "button"
    },
    text: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    buttonClasses() {
      const colorClass = this.colorClass;
      return `${colorClass}`;
    },
    colorClass() {
      switch (this.color) {
        case "primary":
          return "is-primary";
        case "light":
          return "is-light";
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped></style>
