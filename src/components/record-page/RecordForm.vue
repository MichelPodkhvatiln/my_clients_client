<template>
  <div class="container">
    <div class="columns pt-4">
      <div v-if="!isLoading" class="column is-6 is-offset-3">
        <h3 class="title is-3 has-text-centered">
          Selected salon: {{ salonName }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RecordForm",
  props: {
    salonId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      salonInfo: null
    };
  },
  async beforeMount() {
    try {
      this.isLoading = true;

      this.salonInfo = await this.getSalonById({
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
    }
  },
  methods: {
    ...mapActions("salonModule", ["getSalonById"])
  }
};
</script>

<style scoped lang="scss"></style>
