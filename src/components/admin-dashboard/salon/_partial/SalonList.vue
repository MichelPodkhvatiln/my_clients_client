<template>
  <div class="container is-fluid">
    <template v-if="!isLoading">
      <div class="columns is-multiline">
        <template v-if="salonsList.length">
          <div v-for="salon in salonsList" :key="salon._id" class="column is-3">
            <div class="box salon__card">
              <figure class="salon__card--map">
                <img
                  :src="getImgSrc(salon)"
                  loading="lazy"
                  :width="imgConfig.width"
                  :height="imgConfig.height"
                  alt="Map img"
                />
              </figure>

              <div class="px-2">
                <p class="title is-4">
                  {{ salon.name }}
                </p>
                <p class="subtitle is-6">
                  {{ salon.location.address }}
                </p>
              </div>

              <div
                class="salon__card--footer is-flex is-justify-content-flex-end px-2"
              >
                <div class="buttons">
                  <button
                    class="button is-link"
                    @click="onEditClick(salon._id)"
                  >
                    Редактировать
                  </button>
                  <button
                    class="button is-danger"
                    @click="onDeleteSalon(salon._id)"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
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
  data() {
    return {
      imgConfig: {
        width: 350,
        height: 350
      }
    };
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
        width: this.imgConfig.width,
        height: this.imgConfig.height
      };

      return googleService.createStaticMapImgSrc(coordinates, size);
    },
    onEditClick(salonId) {
      this.setEditingSalonId(salonId);
      this.$emit("onEdit");
    },
    onDeleteSalon(salonId) {
      this.$modal.show("confirm-modal", {
        onConfirm: async () => {
          try {
            await this.deleteSalon(salonId);
          } catch (error) {
            console.error(error);
          } finally {
            this.$modal.hide("confirm-modal");
          }
        },
        onCancel: () => {
          this.$modal.hide("confirm-modal");
        }
      });
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
  padding: 0 0 60px 0;
  border-radius: 5px;
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

.salon__card--footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
}
</style>
