import React from 'react';
import {GoogleMap} from '@react-google-maps/api'
import { CurrentLocationMarker } from '../CurrentLocationMarker';
import s from './Map.module.css';
import { Marker } from '../Marker/Marker';
import { defaultTheme } from './Theme';
import MarkerModalInfo from '../MarkerInfoModal/MarkerInfoModal';
import NearestShelterModal from '../NearestShelterModal/NearestShelterModal'
import { MarkerClusterer } from "@googlemaps/markerclusterer";




const containerStyle = {
  width: '100%',
  height: '100%'
  };
  

const defaltOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  gestureHandling: 'greedy',
  styles: defaultTheme
}

export const MODES = {
  MOVE: 0,
  SET_MARKER:1
}


const Map = ({center, mode, markers, shelters, onMarkerAdd, defaultCenter, nearestModalIsOpen, nearestShelter}) => {

  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  
  

  const openModal = (marker) => {
    setSelectedMarker(marker);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setSelectedMarker(null);
    setModalIsOpen(false);
  }





    const mapRef = React.useRef(undefined);

    const onLoad = React.useCallback(function callback(map) {
       
        mapRef.current = map;
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
      }, [])


    const onClick = React.useCallback((loc) => {
      if (mode === MODES.SET_MARKER){
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        console.log({lat, lng});
        onMarkerAdd({lat, lng})
      }
    }, [mode, onMarkerAdd]);

 

    return <div className={s.container}>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        options={defaltOptions}
      >
        {center !== defaultCenter ? <CurrentLocationMarker position={center} /> : ''}

        
        
        {/* {mode == MODES.SET_MARKER ? markers.map((pos,index) => <Marker key={index} position={pos}/>): shelters.map((shelter,index) => <Marker key={index} position={shelter.coordinates}/>)} */}
        
        {mode === MODES.SET_MARKER ? (
  markers.map((pos, index) => <Marker key={index} position={pos} />)
) : (
  shelters.map((shelter, index) => (
    <Marker key={index} position={{ lat: shelter.geometry.coordinates.lng, lng: shelter.geometry.coordinates.lat }}  shelter={shelter} onClick={openModal}/>
  ))
)}
      </GoogleMap>
    <MarkerModalInfo
    isOpen={modalIsOpen}
    closeModal={closeModal}
    markerInfo={selectedMarker}/>
    <NearestShelterModal
    isOpen={nearestModalIsOpen}
    closeModal={closeModal}
    nearestShelter={nearestShelter}/>
    </div>
}
export {Map}