<template>
  <div class="map-wrapper">
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import { googleMapsApiURL } from "@/utils/constants";

export default {
  name: "GoogleMap",
  data() {
    return {
      googleMaps: null,
      map: null
    };
  },
  mounted() {
    this.checkLoadScript();
  },
  methods: {
    checkLoadScript() {
      const isScript = document.getElementById("google-map-script");

      if (isScript) {
        this.initMap();
        return;
      }

      const script = document.createElement("script");

      script.onload = async () => {
        this.initMap();
      };

      script.id = "google-map-script";
      script.src = googleMapsApiURL;

      document.head.appendChild(script);
    },
    initMap() {
      // eslint-disable-next-line no-undef
      this.googleMaps = google.maps;

      this.map = new this.googleMaps.Map(this.$refs.map, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15
      });

      this.setCurrentPositionToMap();
    },
    setCurrentPositionToMap() {
      if (!navigator.geolocation || !this.map) {
        return;
      }

      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.map.setCenter(coordinates);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.map,
.map-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
