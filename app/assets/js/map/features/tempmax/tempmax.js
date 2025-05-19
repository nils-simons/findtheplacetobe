const loadClimate = () => {
  map.addSource("temperature-data", {
    type: "geojson",
    data: "./assets/js/map/features/tempmax/tempmax_2050.geojson",
  });

  map.addLayer({
    id: "temperature-heatmap",
    type: "heatmap",
    source: "temperature-data",
    layout: {
      visibility: "none",
    },
    maxzoom: 6,
    paint: {
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "temp_mean_max_2050"],
        -20,
        -1,
        60,
        1,
      ],
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        3,
        2.7,
        6,
        5,
      ],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 6, 20],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(255,255,255,0)",
        0.2,
        "rgb(53, 92, 248)",
        0.4,
        "rgb(251, 255, 13)",
        0.6,
        "rgb(255, 13, 13)",
        1,
        "rgb(28, 0, 0)",
      ],
      "heatmap-opacity": 1,
    },
  });
};

document
  .getElementById("tempmax2050-enable")
  .addEventListener("change", (e) => {
    if (e.target.checked) {
      map.setLayoutProperty("temperature-heatmap", "visibility", "visible");
    } else {
      map.setLayoutProperty("temperature-heatmap", "visibility", "none");
    }
  });
