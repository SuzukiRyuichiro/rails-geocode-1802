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
    this.#fitMapToMarkers();
  }

  #addMarkersToMap() {
    // iterate over the array of geolocations
    this.markersValue.forEach((marker) => {
      // create popup
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html); // Add this

      // create a div that is going to be the pin
      const customMarker = document.createElement("div");
      customMarker.innerHTML = marker.marker_html;

      // Add that pin to the map
      new mapboxgl.Marker(customMarker)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }

  #fitMapToMarkers() {
    // iterate over the markers
    const bounds = new mapboxgl.LngLatBounds();
    // as I go through the locations, I will update the bounds of the map
    this.markersValue.forEach((marker) =>
      bounds.extend([marker.lng, marker.lat])
    );
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  }
}
