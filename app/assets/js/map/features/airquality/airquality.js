const loadAirQuality = () => {
    map.addSource('air-quality', {
        type: 'geojson',
        data: './assets/js/map/features/airquality/airquality.geojson' // or use your JSON object directly
      });
    
      map.addLayer({
        id: 'air-quality-heat',
        type: 'heatmap',
        source: 'air-quality',
        layout: {
          visibility: 'none'  // This hides the layer by default
        },
        maxzoom: 15,
        paint: {
          // Weight the heatmap by pollutant value
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'measurements_value'],
            0, 0,
            1000, 1
          ],
          // Increase intensity at zoomed-in levels
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 3
          ],
          // Color ramp for heatmap
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          // Radius of each point
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            15, 20
          ],
          // Opacity
          'heatmap-opacity': 0.8
        }
      });
}

document.getElementById("airquality-enable").addEventListener("change", (e) => {

    if (e.target.checked) {
      map.setLayoutProperty('air-quality-heat', "visibility", "visible");
    } else {
      map.setLayoutProperty('air-quality-heat', "visibility", "none");
    }
  });