<template>
  <div class="page-wrapper">
    <div class="container pt-4 pb-4">
      <template v-if="!isLoading">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <h1
              class="title is-1 is-uppercase has-text-centered has-text-weight-bold"
            >
              Grizzly barbershop
            </h1>
          </div>
        </div>

        <div v-if="salonsList.length" class="columns is-multiline">
          <div v-for="salon in salonsList" :key="salon._id" class="column is-3">
            <div class="box salon__card" @click="startRecordProcess(salon._id)">
              <figure class="salon__card--map">
                <img
                  :src="getImgSrc(salon)"
                  loading="lazy"
                  :width="imgConfig.width"
                  :height="imgConfig.height"
                  alt="Map img"
                />
              </figure>

              <div class="px-4 pb-2">
                <p class="title is-4">
                  {{ salon.name }}
                </p>
                <p class="subtitle is-6">
                  {{ salon.location.address }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <span v-else class="is-size-4">
          Salons not found
        </span>
      </template>
      <template v-else>
        <div
          class="loader-container container is-fluid is-flex is-align-items-center is-justify-content-center"
        >
          <half-circle-spinner
            :animation-duration="1000"
            :size="60"
            color="#00d1b2"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { HalfCircleSpinner } from "epic-spinners";

import { GoogleMapsService } from "@/services/googleMaps.service";

const googleService = new GoogleMapsService();

export default {
  name: "Record",
  components: {
    HalfCircleSpinner
  },
  data() {
    return {
      isLoading: false,
      salonsList: [],
      imgConfig: {
        width: 350,
        height: 350
      }
    };
  },
  async beforeMount() {
    try {
      this.isLoading = true;
      this.salonsList = await this.getSalonList(true);
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("salonModule", ["getSalonList"]),
    getImgSrc(salon) {
      if (!salon) {
        return "";
      }

      const coordinates = salon.location.coordinates;
      const size = {
        width: this.imgConfig.width,
        height: this.imgConfig.height
      };

      return googleService.createStaticMapImgSrc(coordinates, size);
    },
    startRecordProcess(salonId) {
      this.$router.push({ name: "RecordProcess", params: { salonId } });
    }
  }
};
</script>

<style scoped lang="scss">
.loader-container {
  height: calc(100vh - 170px);
}

.box {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
}

.salon__card {
  position: relative;
  width: 100%;
  height: 100%;
}

.salon__card--map {
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;
    background-color: #b5b5b5;
  }
}
</style>
