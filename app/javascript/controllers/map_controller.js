import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Connects to data-controller="map"
export default class extends Controller {
  static values = { mapboxToken: String, markers: Array };
  connect() {
    mapboxgl.accessToken = this.mapboxTokenValue;
    const map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/scooter-scooter/cm1gfg3h206ry01pq1rsf9ko2", // style URL
    });

    this.map = map;

    // Run a function to get the markers
    this.#addMarkersToMap();
    this.#fitMarkersToMap();

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }),
    );
  }

  #addMarkersToMap() {
    // Get the marker JSON from the HTML
    const markers = this.markersValue;
    // Iterate over each marker coordinates, and add a marker to the map
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        marker.popupWindowHTML,
      );

      const customMarker = document.createElement("div");
      customMarker.innerHTML = marker.markerHTML;

      new mapboxgl.Marker(customMarker)
        .setLngLat(marker)
        .setPopup(popup)
        .addTo(this.map);
    });
  }

  #fitMarkersToMap() {
    const markers = this.markersValue;
    const bounds = new mapboxgl.LngLatBounds(markers[0], markers[0]);

    markers.forEach((marker) => {
      bounds.extend(marker);
    });

    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  }
}
