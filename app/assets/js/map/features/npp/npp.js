const plants = [
  // Belgium
  { name: "Doel Nuclear Power Station", coordinates: [4.2625, 51.3267] },
  { name: "Tihange Nuclear Power Station", coordinates: [5.2751, 50.5342] },

  // France
  { name: "Gravelines Nuclear Power Station", coordinates: [2.1264, 50.9875] },
  { name: "Cattenom Nuclear Power Station", coordinates: [6.2167, 49.4167] },
  { name: "Bugey Nuclear Power Station", coordinates: [5.275, 45.7833] },
  { name: "Tricastin Nuclear Power Station", coordinates: [4.7167, 44.3167] },

  // Slovenia
  { name: "Krško Nuclear Power Plant", coordinates: [15.5167, 45.95] },

  // Czech Republic
  { name: "Temelín Nuclear Power Station", coordinates: [14.35, 49.15] },
  { name: "Dukovany Nuclear Power Station", coordinates: [16.1167, 49.0833] },

  // Hungary
  { name: "Paks Nuclear Power Plant", coordinates: [18.8667, 46.6167] },

  // Bulgaria
  { name: "Kozloduy Nuclear Power Plant", coordinates: [23.7333, 43.7667] },

  // Romania
  { name: "Cernavodă Nuclear Power Plant", coordinates: [28.05, 44.3333] },

  // Finland
  { name: "Olkiluoto Nuclear Power Plant", coordinates: [21.4333, 61.2333] },
  { name: "Loviisa Nuclear Power Plant", coordinates: [26.2333, 60.4667] },

  // Sweden
  { name: "Ringhals Nuclear Power Plant", coordinates: [12.1, 57.25] },
  { name: "Forsmark Nuclear Power Plant", coordinates: [18.158, 60.403] },
  { name: "Oskarshamn Nuclear Power Plant", coordinates: [16.45, 57.35] },

  // Slovakia
  { name: "Bohunice Nuclear Power Plant", coordinates: [17.7, 48.5] },
  { name: "Mochovce Nuclear Power Plant", coordinates: [18.45, 48.25] },

  // Ukraine
  { name: "Khmelnitsky Nuclear Power Plant", coordinates: [26.6667, 50.3167] },
  { name: "Rivne Nuclear Power Plant", coordinates: [26.25, 51.3333] },
  {
    name: "South Ukraine Nuclear Power Plant",
    coordinates: [31.1833, 47.8167],
  },
  { name: "Zaporizhzhia Nuclear Power Plant", coordinates: [34.5833, 47.5] },

  // Russia (European part)
  { name: "Balakovo Nuclear Power Plant", coordinates: [47.95, 52.0333] },
  { name: "Beloyarsk Nuclear Power Station", coordinates: [60.75, 56.8333] },
  { name: "Kalinin Nuclear Power Plant", coordinates: [35.0, 57.8833] },
  { name: "Kursk Nuclear Power Plant", coordinates: [36.45, 51.6667] },
  { name: "Leningrad Nuclear Power Plant", coordinates: [29.0, 59.85] },
  { name: "Novovoronezh Nuclear Power Plant", coordinates: [39.2, 51.2667] },
  { name: "Rostov Nuclear Power Plant", coordinates: [41.0, 47.5] },
  { name: "Smolensk Nuclear Power Plant", coordinates: [33.0, 54.1667] },
  { name: "Kola Nuclear Power Plant", coordinates: [32.5, 67.4667] },
  { name: "Bilibino Nuclear Power Plant", coordinates: [166.45, 68.05] },

  // Spain
  { name: "Almaraz Nuclear Power Plant", coordinates: [-5.6975, 39.8075] },
  { name: "Ascó Nuclear Power Plant", coordinates: [0.5708, 41.1836] },
  { name: "Cofrentes Nuclear Power Plant", coordinates: [-1.061, 39.2367] },
  { name: "Vandellós II Nuclear Power Plant", coordinates: [0.8533, 40.9633] },
  { name: "Trillo Nuclear Power Plant", coordinates: [-2.5917, 40.7036] },

  // United Kingdom
  { name: "Heysham Nuclear Power Station", coordinates: [-2.921, 54.042] },
  { name: "Hartlepool Nuclear Power Station", coordinates: [-1.181, 54.625] },
  { name: "Torness Nuclear Power Station", coordinates: [-2.44, 55.9633] },
  { name: "Sizewell B Nuclear Power Station", coordinates: [1.621, 52.213] },
  {
    name: "Hinkley Point B Nuclear Power Station",
    coordinates: [-3.159, 51.208],
  },
];

const dangerZones = []; // Track { sourceId, coordinates }

const loadNPP = () => {
  map.on("load", () => {
    plants.forEach((plant) => {
      const sourceId = `${plant.name}-danger-zone`;
      const layerId = `${plant.name}-danger-zone-layer`;

      map.addSource(sourceId, {
        type: "geojson",
        data: createCircle(plant.coordinates, 50000),
      });

      map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        layout: {},
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.3,
        },
      });

      dangerZones.push({ sourceId, coordinates: plant.coordinates });
    });
  });
};

function createCircle(center, radiusInMeters, points = 64) {
  const coords = { latitude: center[1], longitude: center[0] };
  const km = radiusInMeters / 1000;
  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature",
    geometry: { type: "Polygon", coordinates: [ret] },
  };
}

document.getElementById("npp-enable").addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  const dangerZoneLayers = plants.map(
    (plant) => `${plant.name}-danger-zone-layer`
  );

  if (isChecked) {
    dangerZoneLayers.forEach((layerId) => {
      map.setLayoutProperty(layerId, "visibility", "visible");
    });
  } else {
    dangerZoneLayers.forEach((layerId) => {
      map.setLayoutProperty(layerId, "visibility", "none");
    });
  }
});

document.getElementById("npp-radius").addEventListener("input", (e) => {
  document.getElementById("npp-radius-value").innerText = e.target.value + "km";
});

document.getElementById("npp-radius").addEventListener("change", (e) => {
  dangerZones.forEach(({ sourceId, coordinates }) => {
    const source = map.getSource(sourceId);
    if (source) {
      source.setData(createCircle(coordinates, e.target.value * 1000));
    }
  });
});