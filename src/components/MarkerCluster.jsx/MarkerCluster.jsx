import React from "react"
import {MarkerClusterer} from '@googlemaps/markerclusterer';

export const MarkerCluster = ({ map, markers }) => {
    const clusterRef = useRef(null);
    ma

    useEffect(() => {
      if (map && markers && markers.length) {
        clusterRef.current = new MarkerClusterer(map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        });
  
        return () => {
          clusterRef.current.clearMarkers();
        };
      }
    }, [map, markers]);
  
    return null; // Ми не повертаємо нічого, оскільки MarkerClusterer відразу вставляє маркери на карту
  };

