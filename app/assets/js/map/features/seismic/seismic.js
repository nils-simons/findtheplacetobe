

const loadSeismic = () => {
    map.addSource('seismic-risk', {
        type: 'geojson',
        data: "./assets/js/map/features/seismic/seismic.geojson",
    });

    // Add flood polygons as a fill layer
    map.addLayer({
        'id': 'seismic-risk-layer',
        'type': 'fill',
        'source': 'seismic-risk',
        'layout': {
            'visibility': 'none'  // This hides the layer by default
        },
        'paint': {
            'fill-color': '#f5b642', // DodgerBlue
            'fill-opacity': 0.5
        }
    });

    // Add a black outline around the polygons
    map.addLayer({
        'id': 'seismic-risk-borders',
        'type': 'line',
        'source': 'seismic-risk',
        'layout': {
            'visibility': 'none'  // This hides the layer by default
        },
        'paint': {
            'line-color': '#000000',
            'line-width': 2
        }
    });
}


document.getElementById("seismic-enable").addEventListener("change", (e) => {

    if (e.target.checked) {
      map.setLayoutProperty('seismic-risk-layer', "visibility", "visible");
      map.setLayoutProperty('seismic-risk-borders', "visibility", "visible");
    } else {
      map.setLayoutProperty('seismic-risk-layer', "visibility", "none");
      map.setLayoutProperty('seismic-risk-borders', "visibility", "none");
    }
});