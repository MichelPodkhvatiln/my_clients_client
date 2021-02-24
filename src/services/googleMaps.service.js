import axios from "axios";

export class GoogleMapsService {
  _apiKey;
  _baseGeocodingUrl;

  constructor() {
    this._apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
    this._baseGeocodingUrl = "https://maps.googleapis.com/maps/api";
  }

  async getAddressDataFromCoordinates({ lat, lng }) {
    const address = `${lat},${lng}`;

    const requestUrl = `${this._baseGeocodingUrl}/geocode/json?latlng=${address}&key=${this._apiKey}&language=en`;

    const { data } = await axios.get(requestUrl);

    return data;
  }

  createStaticMapImgSrc({ lat, lng }, { width, height }) {
    const address = `${lat},${lng}`;
    const size = !width || !height ? "800x600" : `${width}x${height}`;
    const markers = `markers=color:red%7C${address}`;

    return `${this._baseGeocodingUrl}/staticmap?center=${address}&zoom=15&size=${size}&${markers}&key=${this._apiKey}&language=en`;
  }
}
