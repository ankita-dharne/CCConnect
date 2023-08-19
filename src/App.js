import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import NavMenu from "./components/NavMenu";


function App() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibHBlaTc1NiIsImEiOiJjbGxoOHozODAwOHpxM2xsd2ZsM2xzOWl3In0.Gh9K818BkemD9i3PrQblrQ";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(172.6362);
  const [lat, setLat] = useState(-43.5321);
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('load', function () {
      map.current.loadImage('/Operative.png', function (error, image) {
        if (error) throw error;
        map.current.addImage('operative-icon', image);

        // Continue with adding sources and layers after image is loaded
        Promise.all([
          fetch('DP_Scheduled_Activity_(OpenData).geojson').then(response => response.json()),
          fetch('DP_Outline_Development_(OpenData).geojson').then(response => response.json())
        ]).then(([scheduledActivityData, outlineDevelopmentData]) => {
          map.current.addSource('scheduled-activities', {
            type: 'geojson',
            data: scheduledActivityData
          });

          map.current.addSource('outline-developments', {
            type: 'geojson',
            data: outlineDevelopmentData
          });

          map.current.addLayer({
            'id': 'activities-icons',
            'type': 'symbol',
            'source': 'scheduled-activities',
            'layout': {
              'icon-image': [
                'match',
                ['get', 'LegalStatus'],
                'Operative', 'operative-icon',
                ''   // default
              ],
              'icon-size': 0.08
            }
          });

          map.current.addLayer({
            'id': 'outline-development-icons',
            'type': 'symbol',
            'source': 'outline-developments',
            'layout': {
              'icon-image': [
                'match',
                ['get', 'LegalStatus'],
                'Operative', 'operative-icon',
                ''   // default
              ],
              'icon-size': 0.08
            }
          });

          map.current.on('click', 'activities-icons', e => {
            var feature = e.features[0];
            var popup = new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<strong>${feature.properties.ActivityName}</strong><br>` +
                `Type: ${feature.properties.Type}<br>` +
                `Activity Number: ${feature.properties.ActivityNumber}<br>` +
                `Legal Status: ${feature.properties.LegalStatus}`)
              .addTo(map.current);
          });

          map.current.on('click', 'outline-development-icons', e => {
            var feature = e.features[0];
            var popup = new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<strong>${feature.properties.ActivityName}</strong><br>` +
                `Type: ${feature.properties.Type}<br>` +
                `Activity Number: ${feature.properties.ActivityNumber}<br>` +
                `Legal Status: ${feature.properties.LegalStatus}`)
              .addTo(map.current);
          });
          return () => {
            map.remove();
          };
        });
      });
    });
  }, []);

  return (
    <div>
      <div>
      <NavMenu />
      </div>
      <div ref={mapContainer} className="map-container"/>
    </div>
  );
}

export default App;
