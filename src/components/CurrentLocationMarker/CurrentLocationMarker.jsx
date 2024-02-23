import {MarkerF} from '@react-google-maps/api'


export const CurrentLocationMarker = ({position}) => {
    const icon = {
        url: '/icons8-наруто.svg',
        scaledSize: new window.google.maps.Size(40, 40) 
      };
    return <MarkerF position={position} icon={icon} />
}
