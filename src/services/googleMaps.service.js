import axios from "axios";

export class GoogleMapsService {
  _apiKey;
  _baseGeocodingUrl;

  constructor() {
    this._apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
    this._baseGeocodingUrl = "https://maps.googleapis.com/maps/api/geocode/";
  }

  async getAddressDataFromCoordinates({ lat, lng }) {
    const address = `${lat},${lng}`;

    const requestUrl = `${this._baseGeocodingUrl}json?latlng=${address}&key=${this._apiKey}&language=en`;

    const { data } = await axios.get(requestUrl);

    return data;
  }
}
