<template>
  <section class="add-salon">
    <div class="add-salon__form">
      <div class="field">
        <label class="label">Salon name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="formData.name"
            placeholder="My awesome salon"
          />
        </div>
      </div>
    </div>

    <div class="add-salon__map">
      <google-map @setMapMarker="onSetMapMarker" />
    </div>

    <footer class="add-salon__footer">
      <div class="buttons">
        <button
          class="button is-success"
          @click="onCreateBtnClick"
          :disabled="!canCreateSalon"
        >
          Create
        </button>

        <button class="button is-danger" @click="onCancelBtnClick">
          Cancel
        </button>
      </div>
    </footer>
  </section>
</template>

<script>
import GoogleMap from "@/components/map/GoogleMap";
export default {
  name: "AddSalon",
  components: {
    GoogleMap
  },
  data() {
    return {
      formData: {
        name: "",
        locationInfo: null
      }
    };
  },
  computed: {
    canCreateSalon() {
      return this.formData.name.trim().length && this.formData.locationInfo;
    }
  },
  methods: {
    onSetMapMarker(locationInfo) {
      this.formData.locationInfo = locationInfo;
    },
    onCreateBtnClick() {
      console.log(this.formData);
    },
    onCancelBtnClick() {
      this.$emit("onCancelCreate");
    }
  }
};
</script>

<style scoped lang="scss">
.add-salon {
  width: 100%;
  max-width: 100%;
}

.add-salon__form {
  margin-bottom: 15px;
}

.add-salon__map {
  position: relative;
  width: 100%;
  height: 450px;
}

.add-salon__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
