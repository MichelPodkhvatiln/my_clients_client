<template>
  <div class="salon-list">
    <template v-if="!isLoading">
      <div v-if="salonsList.length" class="salon-list__cards">
        <section class="box" v-for="salon in salonsList" :key="salon._id">
          <div class="image-block">
            <img
              :src="getImgSrc(salon)"
              loading="lazy"
              alt="Placeholder image"
            />
          </div>
          <div class="info-block">
            <p class="title is-4">
              {{ salon.name }}
            </p>
            <p class="subtitle is-6">
              {{ salon.location.address }}
            </p>
          </div>
          <footer class="btn-block">
            <div class="buttons">
              <button class="button is-link" @click="onEditClick(salon.id)">
                Edit
              </button>
              <button class="button is-danger" @click="deleteSalon(salon.id)">
                Delete
              </button>
            </div>
          </footer>
        </section>
      </div>
    </template>
    <template v-else>
      <div class="salon-list__loader">
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#00d1b2"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { HalfCircleSpinner } from "epic-spinners";
import { GoogleMapsService } from "@/services/googleMaps.service";

const googleService = new GoogleMapsService();

export default {
  name: "SalonList",
  components: {
    HalfCircleSpinner
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters("salonModule", ["salonsList"])
  },
  methods: {
    ...mapActions("salonModule", ["deleteSalon", "setEditingSalonId"]),
    getImgSrc(salon) {
      if (!salon) {
        return "";
      }

      const coordinates = salon.location.coordinates;
      const size = {
        width: 350,
        height: 330
      };

      return googleService.createStaticMapImgSrc(coordinates, size);
    },
    onEditClick(salonId) {
      this.setEditingSalonId(salonId);
      this.$emit("onEdit");
    }
  }
};
</script>

<style scoped lang="scss">
.salon-list {
  width: 100%;
}

.salon-list__cards {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 350px));
  grid-template-rows: repeat(auto-fill, minmax(300px, 450px));
}

.salon-list__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 170px);
}

.box {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 0 60px 0;
  border-radius: 5px;
}

.image-block {
  min-height: 330px;
  max-height: 330px;
  background-color: #d9d9d9;
  border-radius: 5px;
  overflow: hidden;
}

.btn-block {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
}

.info-block {
  padding: 10px 20px;
}
</style>
