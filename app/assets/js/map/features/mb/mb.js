const military_bases = [
  { name: "Ramstein Air Base", coordinates: [7.6001, 49.4007] },
  { name: "Mildenhall Air Base", coordinates: [0.4253, 52.4025] },
  { name: "Incirlik Air Base", coordinates: [35.4391, 37.0020] },
  { name: "Naval Station Rota", coordinates: [-6.2885, 36.6355] },
  { name: "Spangdahlem Air Base", coordinates: [6.6956, 49.9845] },
  { name: "Aviano Air Base", coordinates: [12.6299, 46.3152] },
  { name: "Camp Bondsteel", coordinates: [20.3005, 42.2180] },
  { name: "Bergen-Hohne Training Area", coordinates: [10.0992, 52.7158] },
  { name: "U.S. Army Garrison Wiesbaden", coordinates: [8.2433, 50.0766] },
  { name: "Vidsel Test Range", coordinates: [20.8000, 65.5700] },
  { name: "Lakenheath Air Base", coordinates: [0.5120, 52.3800] },
  { name: "Keflavik Naval Air Station", coordinates: [-22.6035, 63.9850] },
  { name: "Thule Air Base", coordinates: [-68.6892, 76.5319] },
  { name: "Pabrade Training Area", coordinates: [25.9356, 55.0373] },
  { name: "Sembach Air Base", coordinates: [7.8421, 49.4206] },
  { name: "Zagan Military Base", coordinates: [15.5986, 51.6317] },
  { name: "Siauliai Air Base", coordinates: [23.0333, 55.9700] },
  { name: "Deveselu Military Base", coordinates: [27.0833, 44.4167] },
  { name: "Gdynia Naval Base", coordinates: [18.5630, 54.5105] },
  { name: "Alconbury Air Base", coordinates: [-0.3407, 52.3252] },
  { name: "Bucharest Military Base", coordinates: [26.1015, 44.4268] }
];

const militaryDangerZones = [];
const loadMB = () => {
  map.on("load", () => {
    military_bases.forEach((base) => {
      const sourceId = `${base.name}-danger-zone`;
      const layerId = `${base.name}-danger-zone-layer`;

      map.addSource(sourceId, {
        type: "geojson",
        data: createCircle(base.coordinates, 5000), // 5km radius
      });

      map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        layout: {},
        paint: {
          "fill-color": "#005713",
          "fill-opacity": 0.3,
        },
      });

      militaryDangerZones.push({ sourceId, coordinates: base.coordinates });
    });
  });
};

// Same helper function (reuse it if possible)
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



document.getElementById("mb-enable").addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  const dangerZoneLayers = military_bases.map(
    (base) => `${base.name}-danger-zone-layer`
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

document.getElementById("mb-radius").addEventListener("input", (e) => {
  document.getElementById("mb-radius-value").innerText = e.target.value + "km";
});

document.getElementById("mb-radius").addEventListener("change", (e) => {
  militaryDangerZones.forEach(({ sourceId, coordinates }) => {
    const source = map.getSource(sourceId);
    if (source) {
      source.setData(createCircle(coordinates, e.target.value * 1000));
    }
  });
});