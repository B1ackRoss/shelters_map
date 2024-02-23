import { Marker as GoogleMapMarker } from '@react-google-maps/api';

const Marker = ({ position, shelter, onClick }) => {
  
  return (
    <GoogleMapMarker
      onClick={() => onClick(shelter)}
      position={position}
      icon={{
        url: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png', 
      }}
    />
  );
};

export { Marker };