<template>
  <div class="map-wrapper">
    <div v-if="isMapReady" class="map-address-block">
      Some address text
    </div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import { googleMapsApiURL } from "@/utils/constants";

export default {
  name: "GoogleMap",
  data() {
    return {
      isMapReady: false,
      googleMaps: null,
      map: null,
      marker: null
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
      this.initMapListeners();
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
    },
    initMapListeners() {
      if (!this.googleMaps || !this.map) {
        return;
      }

      this.googleMaps.event.addListenerOnce(this.map, "idle", () => {
        this.isMapReady = true;
      });

      this.googleMaps.event.addListener(this.map, "click", event => {
        const position = event.latLng;

        if (!this.marker) {
          this.addMarker(position);
          this.getGeoJSON(position);
          return;
        }

        this.changeMarkerPosition(position);
        this.getGeoJSON(position);
      });
    },
    addMarker(position) {
      if (!this.googleMaps || !this.map) {
        return;
      }

      this.marker = new this.googleMaps.Marker({
        position,
        map: this.map
      });
      this.map.panTo(position);
    },
    changeMarkerPosition(position) {
      if (!this.marker) {
        return;
      }

      this.marker.setPosition(position);
      this.map.panTo(position);
    },
    getGeoJSON(position) {
      const dataMap = new this.googleMaps.Data.Feature({
        geometry: new this.googleMaps.Data.Point(position)
      });

      dataMap.toGeoJson(obj => {
        console.log(obj);
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

.map-address-block {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 17px;
  min-width: 48px;
  width: 35%;
  height: 40px;
  font-family: Roboto, Arial, sans-serif;
  color: #565656;
  font-size: 18px;
  font-weight: 500;
  background-color: #ffffff;
  box-shadow: 0 1px 4px -1px rgba(#000000, 0.3);
}
</style>
