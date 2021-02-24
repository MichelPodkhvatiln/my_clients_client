<template>
  <section class="salon-form__wrapper">
    <div class="field salon-form__name">
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
import { mapGetters, mapActions } from "vuex";
import GoogleMap from "@/components/map/GoogleMap";

export default {
  name: "SalonForm",
  components: {
    GoogleMap
  },
  props: {
    salonData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        name: "",
        location: null
      }
    };
  },
  beforeMount() {
    if (!this.editingSalonData) {
      return;
    }

    console.log(this.editingSalonData);
  },
  beforeDestroy() {
    if (!this.editingSalonData) {
      return;
    }

    this.resetEditingSalonId();
  },
  computed: {
    ...mapGetters("salonModule", ["editingSalonData"]),
    canCreateSalon() {
      return this.formData.name.trim().length && this.formData.location;
    }
  },
  methods: {
    ...mapActions("salonModule", ["createSalon", "resetEditingSalonId"]),
    onSetMapMarker(location) {
      this.formData.location = location;
    },
    async onCreateBtnClick() {
      try {
        const data = {
          name: this.formData.name,
          location: this.formData.location
        };

        await this.createSalon(data);

        this.$emit("onBack");
      } catch (error) {
        console.error(error);
      }
    },
    onCancelBtnClick() {
      this.$emit("onBack");
    }
  }
};
</script>

<style scoped lang="scss">
.salon-form__wrapper {
  width: 100%;
  height: 100%;
}

.salon-form__name {
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
