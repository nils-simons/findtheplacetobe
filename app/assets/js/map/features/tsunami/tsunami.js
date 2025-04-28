const loadTsunami = () => {
  map.addSource("tsunami-risk", {
    type: "geojson",
    data: "./assets/js/map/features/tsunami/tsunami_risk.geojson",
  });

  // 2. Fetch the GeoJSON to process the points
  fetch("./assets/js/map/features/tsunami/tsunami_risk.geojson")
    .then((response) => response.json())
    .then((data) => {
      const features = data.features;

      // 3. Loop over the features and create circles with 20km radius
      const circleFeatures = features.map((feature) => {
        const coords = feature.geometry.coordinates;
        const center = [coords[0], coords[1]];

        // Create a simple 20km radius circle (by 20km in degrees, roughly)
        const radiusInDegrees = 20 / 111.32; // Convert 20 km to degrees

        return {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              // Generate a simple circular polygon approximation
              generateCircle(center, radiusInDegrees, 64),
            ],
          },
        };
      });

      const circleGeojson = {
        type: "FeatureCollection",
        features: circleFeatures,
      };

      // 4. Update the source data with the generated circles
      map.getSource("tsunami-risk").setData(circleGeojson);

      // 5. Add a 'fill' layer to show the circles
      map.addLayer({
        id: "tsunami-risk-circles",
        type: "fill",
        source: "tsunami-risk",
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.3,
        },
        filter: ["==", "$type", "Polygon"], // Only polygons
      });

      // 6. Optional: Add an outline to the circles
      map.addLayer({
        id: "tsunami-risk-outline",
        type: "line",
        source: "tsunami-risk",
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
        filter: ["==", "$type", "Polygon"],
      });
    });

  function generateCircle(center, radius, numPoints) {
    const circle = [];
    const angleStep = (2 * Math.PI) / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      circle.push([x, y]);
    }

    // Close the polygon by repeating the first point
    circle.push(circle[0]);

    return circle;
  }
};


document.getElementById("tsunami-enable").addEventListener("change", (e) => {

  if (e.target.checked) {
    map.setLayoutProperty('tsunami-risk-circles', "visibility", "visible");
    map.setLayoutProperty('tsunami-risk-outline', "visibility", "visible");
  } else {
    map.setLayoutProperty('tsunami-risk-circles', "visibility", "none");
    map.setLayoutProperty('tsunami-risk-outline', "visibility", "none");
  }
});