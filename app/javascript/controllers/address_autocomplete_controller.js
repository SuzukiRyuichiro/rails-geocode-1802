import { Controller } from "@hotwired/stimulus";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Connects to data-controller="address-autocomplete"
export default class extends Controller {
  static values = { apiKey: String };

  static targets = ["address"];

  connect() {
    // We want mount the mapbox geocoder onto the input field
    this.geocoder = new MapboxGeocoder({
      accessToken: this.apiKeyValue,
      types: "country,region,place,postcode,locality,neighborhood,address",
    });
    this.geocoder.on("result", (event) => this.#setInputValue(event));
    this.geocoder.on("clear", () => this.#clearInputValue());

    this.geocoder.addTo(this.element);
  }

  #setInputValue(event) {
    // Get the place_name from the event
    const placeName = event.result.place_name;
    // set that as value of the address input field
    this.addressTarget.value = placeName;
  }

  #clearInputValue() {
    // empty the value of the input field
    this.addressTarget.value = "";
  }

  disconnect() {
    this.geocoder.onRemove();
  }
}
