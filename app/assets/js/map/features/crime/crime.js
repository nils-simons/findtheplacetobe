const loadCrime = () => {
  map.addSource("crime-countries", {
    type: "geojson",
    data: "./assets/js/map/features/crime/crime_rate_2024.geojson",
  });

  map.addLayer({
    id: "country-crime",
    type: "fill",
    source: "crime-countries",
    layout: {
      visibility: 'none'  // This hides the layer by default
    },
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "crimeRateByCountry_crimeIndex"],
        20,
        "#f1eef6",
        50,
        "#bdc9e1",
        80,
        "#045a8d",
      ],
      "fill-opacity": 0.6,
    },
  });
};


document.getElementById("crime-enable").addEventListener("change", (e) => {

  if (e.target.checked) {
    map.setLayoutProperty('country-crime', "visibility", "visible");
  } else {
    map.setLayoutProperty('country-crime', "visibility", "none");
  }
});