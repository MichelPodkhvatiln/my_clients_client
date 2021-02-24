<template>
  <div class="map-wrapper">
    <transition name="fade">
      <div v-if="isMapReady" class="map-address-block">
        {{ addressTitle }}
      </div>
    </transition>

    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import { googleMapsApiURL } from "@/utils/constants";

import { GoogleMapsService } from "@/services/googleMaps.service";

export default {
  name: "GoogleMap",
  props: {
    editingCoordinates: {
      type: Object
    }
  },
  data() {
    return {
      googleMaps: null,
      googleMapsService: new GoogleMapsService(),
      isMapReady: false,
      map: null,
      marker: null,
      location: {
        address: null,
        coordinates: {
          lat: null,
          lng: null
        }
      }
    };
  },
  mounted() {
    this.checkLoadScript();
  },
  beforeDestroy() {
    this.removeMapListeners();
  },
  computed: {
    addressTitle() {
      return this.location.address
        ? this.location.address
        : "Please select place on map";
    }
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
        await this.initMap();
      };

      script.id = "google-map-script";
      script.src = googleMapsApiURL;

      document.head.appendChild(script);
    },
    async initMap() {
      // eslint-disable-next-line no-undef
      this.googleMaps = google.maps;

      let center;

      if (this.editingCoordinates) {
        center = this.editingCoordinates;
      } else {
        center = { lat: -34.397, lng: 150.644 };
      }

      this.map = new this.googleMaps.Map(this.$refs.map, {
        center,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true
      });

      this.initMapListeners();

      if (this.editingCoordinates) {
        await this.onSetSalonAddress(this.editingCoordinates);
      } else {
        this.setCurrentPositionToMap();
      }
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

      this.googleMaps.event.addListener(this.map, "click", async event => {
        const position = event.latLng;
        const coordinates = {
          lat: position.lat(),
          lng: position.lng()
        };

        await this.onSetSalonAddress(coordinates);
      });
    },
    removeMapListeners() {
      if (!this.googleMaps || !this.map) {
        return;
      }

      this.googleMaps.event.clearListeners(this.map, "click");
    },
    async onSetSalonAddress(coordinates) {
      if (!this.marker) {
        this.addMarker(coordinates);
      } else {
        this.changeMarkerPosition(coordinates);
      }

      try {
        await this.getAddressFromCoordinates(coordinates);
        this.setLocationCoordinates(coordinates);
        this.$emit("setMapMarker", this.location);
      } catch (error) {
        console.error(error);
      }
    },
    addMarker(coordinates) {
      if (!this.googleMaps || !this.map) {
        return;
      }

      this.marker = new this.googleMaps.Marker({
        position: coordinates,
        map: this.map
      });
      this.map.panTo(coordinates);
    },
    changeMarkerPosition(coordinates) {
      if (!this.marker) {
        return;
      }

      this.marker.setPosition(coordinates);
      this.map.panTo(coordinates);
    },
    async getAddressFromCoordinates(coordinates) {
      const _addressFormatter = addressData => {
        if (!Array.isArray(addressData) || !addressData.length) {
          return;
        }

        const streetNumberObj = addressData.find(data =>
          data.types.includes("street_number")
        );
        const streetObj = addressData.find(data =>
          data.types.includes("route")
        );
        const cityObj = addressData.find(data =>
          data.types.includes("locality")
        );
        const countryObj = addressData.find(data =>
          data.types.includes("country")
        );

        return {
          streetNumber: streetNumberObj ? streetNumberObj.short_name : "",
          street: streetObj ? streetObj.short_name : "",
          city: cityObj ? cityObj.short_name : "",
          country: countryObj ? countryObj.short_name : ""
        };
      };

      const _setAddressTitleToMap = addressObj => {
        if (!addressObj || !Object.keys(addressObj).length) {
          return "Unknown address";
        }

        const street = addressObj.street.length ? `${addressObj.street}, ` : "";
        const streetNumber = addressObj.streetNumber.length
          ? `${addressObj.streetNumber}, `
          : "";
        const city = addressObj.city.length ? `${addressObj.city}, ` : "";
        const country = addressObj.country.length
          ? `${addressObj.country}`
          : "";

        return street + streetNumber + city + country;
      };

      try {
        const {
          results
        } = await this.googleMapsService.getAddressDataFromCoordinates(
          coordinates
        );

        const addressData = results[0]?.address_components;
        const formattedAddress = _addressFormatter(addressData);
        this.location.address = _setAddressTitleToMap(formattedAddress);
      } catch (error) {
        console.error(error);
      }
    },
    setLocationCoordinates(coordinates) {
      if (!coordinates) {
        return;
      }

      this.location.coordinates.lat = coordinates.lat;
      this.location.coordinates.lng = coordinates.lng;
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
  min-width: 35%;
  max-width: 95%;
  height: 40px;
  font-family: Roboto, Arial, sans-serif;
  color: #565656;
  font-size: 18px;
  font-weight: 500;
  background-color: #ffffff;
  box-shadow: 0 1px 4px -1px rgba(#000000, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
