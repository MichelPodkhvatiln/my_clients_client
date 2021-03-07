<template>
  <section class="container is-fluid">
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

    <div class="field">
      <label class="label">Salon address</label>
      <div class="add-salon__map">
        <google-map
          :editingCoordinates="editingCoordinates"
          @setMapMarker="onSetMapMarker"
        />
      </div>
    </div>

    <footer class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <template v-if="editingSalonData">
          <button
            class="button is-success"
            @click="onEditBtnClick"
            :disabled="!canEditSalon"
          >
            Save changes
          </button>
        </template>
        <template v-else>
          <button
            class="button is-success"
            @click="onCreateBtnClick"
            :disabled="!canCreateSalon"
          >
            Create
          </button>
        </template>

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

    this.formData.name = this.editingSalonData.name;
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
    },
    canEditSalon() {
      if (!this.formData.location) {
        return false;
      }

      const isValidName =
        this.formData.name.trim().length &&
        this.formData.name !== this.editingSalonData.name;
      const isChangedLocation =
        this.formData.location.address !==
        this.editingSalonData.location.address;

      return isValidName || isChangedLocation;
    },
    editingCoordinates() {
      if (!this.editingSalonData) {
        return undefined;
      }

      return this.editingSalonData.location.coordinates;
    }
  },
  methods: {
    ...mapActions("salonModule", [
      "createSalon",
      "updateSalon",
      "resetEditingSalonId"
    ]),
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
    async onEditBtnClick() {
      try {
        const formData = {
          name: this.formData.name,
          location: this.formData.location
        };

        await this.updateSalon({ id: this.editingSalonData._id, formData });

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
.add-salon__map {
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
