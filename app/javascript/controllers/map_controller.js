import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";

// Connects to data-controller="map"
export default class extends Controller {
  static values = { mapboxToken: String };
  connect() {
    mapboxgl.accessToken = this.mapboxTokenValue;
    const map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v12", // style URL
    });
  }
}
