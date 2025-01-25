import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
  };

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
    });

    // Add the makers
    this.#addMarkersToMap();
  }

  #addMarkersToMap() {
    // iterate over the array of geolocations
    this.markersValue.forEach((marker) => {
      // create a pin
      // Add that pin to the map
      new mapboxgl.Marker().setLngLat([marker.lng, marker.lat]).addTo(this.map);
    });
  }
}
