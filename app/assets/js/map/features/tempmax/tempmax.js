const loadClimate = () => {
  map.addSource("temperature-data", {
    type: "geojson",
    data: "./assets/js/map/features/tempmax/tempmax_2050.geojson",
  });

  map.addLayer({
    id: "temperature-heatmap",
    type: "heatmap",
    source: "temperature-data",
    // minzoom: 2, // Optional: control the min zoom level where the heatmap is visible
    maxzoom: 6, // Optional: control the max zoom level where the heatmap is visible
    paint: {
      // Heatmap weight: relative to the temperature value
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "temp_mean_max_2050"],
        -20, -1, // No weight for cold temperatures
        60, 1, // Max weight for hot temperatures
      ],
      // Heatmap intensity: controls the "spread" of the heatmap
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1, // Zoom level 0: low intensity
        9,
        3, // Zoom level 9: higher intensity
      ],
      // Heatmap radius: the size of each "heat" point on the map
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        4, // Zoom level 0: smaller radius
        9,
        40, // Zoom level 9: larger radius
      ],
      // Heatmap color: this defines the color gradient of the heatmap
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        -1,
        "rgb(29, 16, 56)",
        -0.25,
        "rgb(53, 92, 248)",
        0,
        "rgba(255, 255, 255, 0.33)",
        0.25,
        "rgb(251, 255, 13)",
        0.5,
        "rgb(255, 13, 13)",
        1,
        "rgb(28, 0, 0)",
      ],
      // Heatmap opacity: Controls transparency of the heatmap layer
      "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        0.3, // Low opacity at zoom level 3
        9,
        1, // Full opacity at zoom level 9
      ],
    },
  });
};

document.getElementById("tempmax2050-enable").addEventListener("change", (e) => {

  if (e.target.checked) {
    map.setLayoutProperty('temperature-heatmap', "visibility", "visible");
  } else {
    map.setLayoutProperty('temperature-heatmap', "visibility", "none");
  }
});