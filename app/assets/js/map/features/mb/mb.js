const military_bases = [
  // Germany
  { name: "Ramstein Air Base", coordinates: [7.6001, 49.4007] },
  { name: "Spangdahlem Air Base", coordinates: [6.6843, 49.9857] },
  { name: "Grafenwöhr Training Area", coordinates: [11.9378, 49.6841] },
  { name: "Hohenfels Training Area", coordinates: [11.8041, 49.2143] },
  { name: "Vilseck Army Base", coordinates: [11.7905, 49.635] },
  { name: "USAG Wiesbaden", coordinates: [8.2417, 50.0747] },
  { name: "Schweinfurt Army Base", coordinates: [10.227, 50.0522] },
  { name: "Baumholder Army Base", coordinates: [7.3197, 49.6533] },
  { name: "Fliegerhorst Neuburg", coordinates: [11.2183, 48.732] },

  // United Kingdom
  { name: "RAF Lakenheath", coordinates: [0.5219, 52.4139] },
  { name: "RAF Mildenhall", coordinates: [0.4772, 52.3789] },
  { name: "RAF Fairford", coordinates: [-1.7833, 51.7] },
  { name: "RAF Alconbury", coordinates: [-0.2833, 52.4] },
  { name: "RAF Menwith Hill", coordinates: [-1.5418, 53.9921] },
  { name: "Portsmouth Naval Base", coordinates: [-1.108, 50.8014] },
  { name: "Catterick Garrison", coordinates: [-1.5722, 54.385] },
  { name: "Aldershot Garrison", coordinates: [-0.7603, 51.247] },
  { name: "Tidworth Camp", coordinates: [-1.7419, 51.2615] },

  // France
  { name: "Camp de Canjuers", coordinates: [6.3, 43.7] },
  { name: "Camp de Valdahon", coordinates: [6.25, 47.2] },
  { name: "Évreux-Fauville Air Base", coordinates: [1.1295, 49.0261] },
  { name: "Base aérienne 123 Orléans-Bricy", coordinates: [1.9, 47.916] },
  { name: "Camp de Mailly", coordinates: [4.2, 48.5] },
  { name: "Camp de Souge", coordinates: [-0.635, 44.8] },

  // Italy
  { name: "Aviano Air Base", coordinates: [12.5985, 46.0699] },
  { name: "Naval Support Activity Naples", coordinates: [14.2681, 40.8518] },
  { name: "Naval Air Station Sigonella", coordinates: [14.9222, 37.4017] },
  { name: "Camp Darby", coordinates: [10.3106, 43.5485] },
  { name: "Ghedi Air Base", coordinates: [10.2078, 45.345] },
  { name: "Decimomannu Air Base", coordinates: [8.9, 39.4] },

  // Spain
  { name: "Naval Station Rota", coordinates: [-6.36298, 36.6263] },
  { name: "Morón Air Base", coordinates: [-5.616, 37.175] },
  { name: "Zaragoza Air Base", coordinates: [-0.8905, 41.6577] },
  { name: "Torrejón Air Base", coordinates: [-3.5489, 40.4917] },
  { name: "Getafe Air Base", coordinates: [-3.7291, 40.3086] },

  // Poland
  { name: "Powidz Air Base", coordinates: [17.816, 52.383] },
  { name: "Łask Air Base", coordinates: [19.115, 51.575] },
  {
    name: "1st Mechanized Division Base - Wesoła",
    coordinates: [21.186, 52.232],
  },
  { name: "Bydgoszcz Military Base", coordinates: [18.01, 53.123] },

  // Netherlands
  { name: "Volkel Air Base", coordinates: [5.534, 51.653] },
  { name: "Gilze-Rijen Air Base", coordinates: [4.939, 51.565] },

  // Belgium
  { name: "Kleine Brogel Air Base", coordinates: [5.4536, 51.1329] },
  { name: "Florennes Air Base", coordinates: [4.6572, 50.1021] },

  // Greece
  { name: "Larissa Air Base", coordinates: [22.4191, 39.639] },
  { name: "Souda Bay Naval Base", coordinates: [24.1536, 35.5376] },
  { name: "Andravida Air Base", coordinates: [21.2333, 37.9333] },

  // Turkey (European part)
  { name: "Incirlik Air Base", coordinates: [35.4333, 37.0] },
  { name: "Izmir Air Station", coordinates: [27.0, 38.4192] },

  // Baltic States
  { name: "Šiauliai Air Base (Lithuania)", coordinates: [23.3456, 55.9333] },
  { name: "Lielvārde Air Base (Latvia)", coordinates: [24.3833, 56.5] },
  { name: "Ämari Air Base (Estonia)", coordinates: [24.4333, 59.4167] },

  // Romania & Bulgaria
  {
    name: "Mihail Kogălniceanu Air Base (Romania)",
    coordinates: [28.4883, 44.3622],
  },
  { name: "Camp Turzii (Romania)", coordinates: [23.6833, 46.4167] },
  { name: "Camp Bondsteel (Kosovo)", coordinates: [21.464, 42.358] },
  {
    name: "Graf Ignatievo Air Base (Bulgaria)",
    coordinates: [26.5919, 42.7203],
  },
  { name: "Bezmer Air Base (Bulgaria)", coordinates: [26.5919, 42.7203] },

  // Russia (Western & European Russia)
  { name: "Severomorsk Naval Base", coordinates: [33.443, 69.064] },
  { name: "Vasilyevsky Island Naval Base", coordinates: [30.226, 59.946] },
  { name: "Kubinka Air Base", coordinates: [36.9833, 55.55] },
  { name: "Kubinka Tank Training Range", coordinates: [36.9167, 55.6167] },
  { name: "Chkalovsk Air Base", coordinates: [31.3, 59.95] },
  { name: "Nizhny Novgorod Military Base", coordinates: [43.9701, 56.3269] },
  { name: "Kursk Air Base", coordinates: [36.18, 51.73] },
  { name: "Kaliningrad Air Base", coordinates: [20.685, 54.899] },

  // Switzerland
  { name: "Payerne Air Base", coordinates: [6.9241, 46.923] },
  { name: "Dübendorf Air Base", coordinates: [8.628, 47.406] },

  // Austria
  { name: "Linz-Hörsching Air Base", coordinates: [14.209, 48.233] },
  { name: "Zeltweg Air Base", coordinates: [14.651, 47.23] },

  // Serbia
  { name: "Lađevci Air Base", coordinates: [20.9667, 43.9] },
  { name: "Niš Air Base", coordinates: [21.91, 43.321] },

  // Finland
  { name: "Rissala Air Base", coordinates: [27.65, 63.16] },
  { name: "Kauhava Air Base", coordinates: [23.11, 63.12] },

  // Norway
  { name: "Ørland Air Station", coordinates: [9.683, 63.68] },
  { name: "Bardufoss Air Station", coordinates: [18.57, 69.06] },

  // Sweden
  { name: "Kallax Air Base", coordinates: [22.15, 65.58] },
  { name: "F17 Kallinge Air Base", coordinates: [15.0, 56.9] },

  // Czech Republic
  { name: "Čáslav Air Base", coordinates: [15.31, 49.82] },

  // Hungary
  { name: "Pápa Air Base", coordinates: [19.2333, 47.6667] },
  { name: "Kecskemét Air Base", coordinates: [19.7, 46.8833] },
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
        layout: {
          visibility: "none", // This hides the layer by default
        },
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
