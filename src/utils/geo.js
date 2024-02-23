const defaultCenter = {
    lat:  50.4501,
    lng:  30.5234
  };

export const getBrowsreLocation = () => {
    return new Promise ((resolve, reject) => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const{latitude: lat, longitude: lng} = pos.coords;
                    resolve({lat, lng});
                },
                () => {
                    reject(defaultCenter);
                },
            );
        }else {
            reject(defaultCenter);
        }
    });
};