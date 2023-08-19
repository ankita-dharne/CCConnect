import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // Make sure to install 'mapbox-gl' package

import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

mapboxgl.accessToken = 'pk.eyJ1IjoibHBlaTc1NiIsImEiOiJjbGxoOHozODAwOHpxM2xsd2ZsM2xzOWl3In0.Gh9K818BkemD9i3PrQblrQ';

function App() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [172.6362, -43.5321],
      zoom: 8
    });

    map.on('load', function () {
      // Load the icons to the map
      map.loadImage('assets/Built.png', function (error, image) {
        if (error) throw error;
        map.addImage('build-icon', image);
      });

      map.loadImage('assets/Maintain.png', function (error, image) {
        if (error) throw error;
        map.addImage('maintain-icon', image);
      });

      map.loadImage('assets/Repair.png', function (error, image) {
        if (error) throw error;
        map.addImage('repair-icon', image);
      });

      // Fetch data from christchurchplaces.json
      fetch('christchurchplaces.json')
        .then(response => response.json())
        .then(data => {
          // Convert data to GeoJSON format
          const geojsonData = {
            type: 'FeatureCollection',
            features: data.map(item => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [item.longitude, item.latitude]
              },
              properties: item
            }))
          };

          // Add the GeoJSON data source to the map
          map.addSource('places', {
            type: 'geojson',
            data: geojsonData
          });

          map.addLayer({
            'id': 'places-points',
            'type': 'symbol',
            'source': 'places',
            'layout': {
              'icon-image': ['match', ['get', 'category'],
                'Build', 'build-icon',
                'Maintain', 'maintain-icon',
                'Repair', 'repair-icon',
                'default-icon'  // Default icon if category does not match any given value
              ],
              'icon-size': 0.08  // Size of the icon
            }
          });

          // Display a popup on click
          map.on('click', 'places-points', function (e) {
            const feature = e.features[0];
            const popup = new mapboxgl.Popup()
              .setLngLat(feature.geometry.coordinates)
              .setHTML('<strong>' + feature.properties.place_name + '</strong><br>' +
                feature.properties.address + '<br>' +
                'Category: ' + feature.properties.category + '<br>' +
                'Contact: ' + feature.properties.point_of_contact + '<br>' +
                'Urgency: ' + feature.properties.urgency + '<br>' +
                'Sentiment: ' + feature.properties.sentiment)
              .addTo(map);
          });
        });
    });
  }, []);

  return (
    <div className="App">
      <div id='map'></div>
    </div>
  );
}

export default App;
