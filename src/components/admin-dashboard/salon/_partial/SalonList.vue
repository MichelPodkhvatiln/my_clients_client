<template>
  <div class="salon-list">
    <template v-if="salonListInfoForCards.length">
      <div class="salon-list__cards">
        <section
          class="box"
          v-for="salon in salonListInfoForCards"
          :key="salon.id"
        >
          <div class="image-block">
            <img :src="getImgSrc(salon)" alt="Placeholder image" />
          </div>
          <div class="info-block">
            <p class="title is-4">
              {{ salon.name }}
            </p>
            <p class="subtitle is-6">
              {{ salon.locationInfo.address }}
            </p>
          </div>
          <footer class="btn-block">
            <div class="buttons">
              <button class="button is-link">
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
  async mounted() {
    try {
      await this.getSalonList();
    } catch (error) {
      console.error(error);
    }
  },
  beforeDestroy() {
    this.resetState();
  },
  computed: {
    ...mapGetters("salonModule", ["salonListInfoForCards"])
  },
  methods: {
    ...mapActions("salonModule", ["resetState", "getSalonList", "deleteSalon"]),
    getImgSrc(salon) {
      if (!salon) {
        return "";
      }

      const coordinates = salon.locationInfo.location.coordinates;

      return googleService.createStaticMapImgSrc(coordinates);
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
  grid-template-columns: 1fr 1fr 1fr;
}

.salon-list__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 170px);
}

.box {
  padding: 0;
  margin: 10px;
  border-radius: 5px;
}

.image-block {
  border-radius: 5px;
  overflow: hidden;
}

.btn-block {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 20px;
}

.info-block {
  padding: 10px 20px;
}
</style>
