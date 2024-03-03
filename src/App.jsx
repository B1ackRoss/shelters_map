import React from 'react';
import {Map, MODES} from './components/Map';
import { useState } from 'react';
import { useCallback, useEffect } from 'react';
import { useJsApiLoader} from '@react-google-maps/api'
import { Autocomplete } from './components/Autocomplete';
import { getBrowsreLocation } from './utils/geo';
import data from "./Shelters.json"
import s from './App.module.css'

const API_KEY = 'AIzaSyA3MnuZQCUPFKiiqbnBH203Pr7frdOLxBI'



const defaultCenter = {
  lat:  50.4501,
  lng:  30.5234
};


const libraries = ['places'];

const ModalContext = React.createContext();


const App = () => {

  const [mode, setMode] = useState(MODES.MOVE)
  const [center, setCenter] = useState(defaultCenter);
  const [shelters, setShelters] = useState(data);
  const [markers, setMarkers] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showShelters, setShowShelters] = useState(false);
  const [nearestModalIsOpen, setnearestModalIsOpen] = useState(false);
  const [nearestShelter, setNearestShelter] = useState(null);
  const [locationReceived, setLocationReceived] = useState(false);
  const [markerMode, setMarkerMode] = useState(false);
 
  const { isLoaded, loadError } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: API_KEY,
  libraries
 });

//  useEffect(() => {
//   if (userLat !== null && userLng !== null) {
//     shelters.forEach((shelter) => {
//       const shelterLat = shelter.geometry.coordinates.lng;
//       const shelterLng = shelter.geometry.coordinates.lat;

//       const distance = getDistanceFromLatLonInKm(userLat, userLng, shelterLat, shelterLng);
//       if (distance < minDistance) {
//         minDistance = distance;
//         setNearestShelter(shelter);
//       }
//     });
//   }
// }, [userLat, userLng, shelters]); 

  const onPlaceSelect = useCallback(
    (coordinates) => {
      setCenter(coordinates);      
    },
    [],
  )

  const ToggleMode = useCallback (() => {
    switch(mode){
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode);
  }, [mode]
 )

  if (loadError) {
    console.error('Error loading Google Maps API:', loadError);
  }

  const onMarkerAdd = (coordinates) => {
    setMarkers([...markers, coordinates])
  }
 
  const onDelete = () => {
    setMarkers([]);
  }

  const getLocationOnClick = () => {
    getBrowsreLocation()
      .then((curloc) => {
        setCenter(curloc)
        setLocationReceived(true);
        let minDistance = Infinity;
      let nearestShelter = null;

      shelters.forEach((shelter) => {
        const shelterLat = shelter.geometry.coordinates.lng;
        const shelterLng = shelter.geometry.coordinates.lat;

        const distance = getDistanceFromLatLonInKm(curloc.lat, curloc.lng, shelterLat, shelterLng);
        if (distance < minDistance) {
          minDistance = distance;
          nearestShelter = shelter;
        }
      });

      setNearestShelter(nearestShelter); // Встановлюємо найближче укриття
    })
      
      .catch((defaultLocation) => {
        setCenter(defaultLocation)
      });
      
  };

 
    let minDistance = Infinity;

  const addShelters = () => {
    setShowShelters(!showShelters);
    setMarkers([]);
    setnearestModalIsOpen(true);
    console.log(shelters)
    

    // shelters.forEach((shelter) => {
    //   const shelterLat = shelter.geometry.coordinates.lng;
    //   const shelterLng = shelter.geometry.coordinates.lat;

    //   const distance = getDistanceFromLatLonInKm(userLat, userLng, shelterLat, shelterLng);
    //   if (distance < minDistance) {
    //     minDistance = distance;
    //     setNearestShelter(shelter)
    //   }
    // });
    if (!locationReceived) {
      getLocationOnClick();
    }
      
  }

  const closeNearModal = () => {
    setnearestModalIsOpen(false);
  }

  const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  

  return (
    <ModalContext.Provider value={{ closeNearModal  }}>
    <div className='App'>
      <div className={s.AddressSearchContainer}>
        <Autocomplete isLoaded={isLoaded} onselect={onPlaceSelect}/>
        
      
        
      </div>
      <div className={s.loc_Img_Container}>
        <button className={s.clear_btn} onClick={getLocationOnClick}>
         <img className={s.loc_Img} width={55} height={55}  src="/location.svg" alt="geolocation" />
        </button>
          
      </div>
      <div className={s.shelter_Btn_Container}>
        <button className={s.clear_btn} onClick={addShelters}>
          <img className={s.shelter_Img} width={55} height={55}  src="/shelter-svgrepo-com.svg" alt="Shelters" />
        </button>
      </div>
      <div>
        <button className={ s.btn_add_markers}  onClick={() => {
        ToggleMode();
        setIsButtonClicked(!isButtonClicked);
        setMarkerMode(!markerMode);
        }}>
          <img className={s.marker_img_add} src="/current-location.svg" alt="" />
        </button>
        {markerMode ? <button className={s.btn_delete_markers}  onClick={onDelete}>
          <img className={s.marker_img_delete} src="/delete (1).svg" alt="" />
        </button> : ''}
      </div>
    
      {isLoaded ? <Map defaultCenter={defaultCenter} center={center} mode={mode} markers={markers} onMarkerAdd={onMarkerAdd} nearestModalIsOpen={nearestModalIsOpen} nearestShelter={nearestShelter}  shelters={showShelters ? shelters : []}/> : <div ><h2 className={s.loadText}>Loading</h2></div>}
     
    </div>
    </ModalContext.Provider>
  )
}

export { App, ModalContext };
