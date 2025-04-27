const loadClimate = () => {
  map.addSource("temperature-data", {
    type: "geojson",
    data: "./assets/js/map.html/features/climate/temp.geojson",
  });

  map.addLayer({
    id: "temperature-heatmap",
    type: "heatmap",
    source: "temperature-data",
    maxzoom: 9, // Optional: control the max zoom level where the heatmap is visible
    paint: {
      // Heatmap weight: relative to the temperature value
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "temp_mean_max_2041_2060"],
        -20,
        -1, // No weight for cold temperatures
        50,
        1, // Max weight for hot temperatures
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
        "rgb(29, 16, 56)", // Blue (no intensity)
        -0.5,
        "rgb(53, 92, 248)", // Blue (no intensity)
        0,
        "rgb(255, 255, 255)", // Blue (no intensity)
        0.25,
        "rgb(251, 255, 13)", // Cyan    // Red
        0.5,
        "rgb(255, 13, 13)", // Cyan    // Red
        1,
        "rgb(28, 0, 0)", // Bright Red
      ],
      // Heatmap opacity: Controls transparency of the heatmap layer
      "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3,
        0.5, // Low opacity at zoom level 3
        9,
        1, // Full opacity at zoom level 9
      ],
    },
  });

  map.addLayer({
    id: "temperature-points",
    type: "circle",
    source: "temperature-data",
    minzoom: 9, // This layer is visible only from zoom level 9 and beyond
    paint: {
      "circle-radius": 5, // Adjust the size of the points
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "temp_mean_max_2041_2060"],
        -50,
        "rgb(0, 0, 255)", // Cold temperatures: Blue
        50,
        "rgb(255, 0, 0)", // Hot temperatures: Red
      ],
      "circle-opacity": 0.8,
    },
  });

  map.on("zoom", function () {
    var zoom = map.getZoom();

    if (zoom > 6) {
      // If zoom is below 9, show heatmap and hide points
      map.setLayoutProperty("temperature-heatmap", "visibility", "none");
    } else {
      map.setLayoutProperty("temperature-heatmap", "visibility", "visible");
    }
  });
};
