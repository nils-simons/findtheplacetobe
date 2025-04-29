mapboxgl.accessToken =
  "pk.eyJ1Ijoibmlsc3NpbW9ucyIsImEiOiJjbDZmN2IxNDgwZWp3M2lyd2k0MzF0dzJzIn0.H3x09JSqZ1v9GimpTgmxOw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/nilssimons/cm9zll6as01mg01r3fvcsdotn",
  projection: "globe", // Display the map as a globe, since satellite-v9 defaults to Mercator
  zoom: 2,
  center: [4.381028151922727, 50.82769041343039],
});

map.addControl(new mapboxgl.NavigationControl());
// map.scrollZoom.disable();

map.on("style.load", () => {
  loadClimate();
  loadFloodings();
  loadSeismic();
  loadAirQuality();
  loadTsunami();
  loadCrime();

  map.setFog({}); // Set the default atmosphere style
});



loadNPP();

loadMB();