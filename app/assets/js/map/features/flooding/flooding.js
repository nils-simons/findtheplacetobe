

const loadFloodings = () => {
    map.addSource('flood-risk', {
        type: 'geojson',
        data: "./assets/js/map/features/flooding/flooding.geojson",
    });

    // Add flood polygons as a fill layer
    map.addLayer({
        'id': 'flood-risk-layer',
        'type': 'fill',
        'source': 'flood-risk',
        'layout': {
            'visibility': 'none'  // This hides the layer by default
        },
        'paint': {
            'fill-color': '#1E90FF', // DodgerBlue
            'fill-opacity': 0.5
        }
    });

    // Add a black outline around the polygons
    map.addLayer({
        'id': 'flood-risk-borders',
        'type': 'line',
        'source': 'flood-risk',
        'layout': {
            'visibility': 'none'  // This hides the layer by default
        },
        'paint': {
            'line-color': '#000000',
            'line-width': 2
        }
    });
}

document.getElementById("flooding-enable").addEventListener("change", (e) => {

    if (e.target.checked) {
      map.setLayoutProperty('flood-risk-layer', "visibility", "visible");
      map.setLayoutProperty('flood-risk-borders', "visibility", "visible");
    } else {
      map.setLayoutProperty('flood-risk-layer', "visibility", "none");
      map.setLayoutProperty('flood-risk-borders', "visibility", "none");
    }
});