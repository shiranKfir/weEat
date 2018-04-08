import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const handleChange = (marker) => {
    if (marker){
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }

};

const Map = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        onCenterChanged={handleChange}
        center={props.center}>
        {
            props.restaurants.map(marker => (
            <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                defaultAnimation={marker.id == props.selected.id ? google.maps.Animation.DROP : 3}
            />))
        }
    </GoogleMap>
));

function MarkerWithLable(props){
    return(
        <h1>add lable here.....</h1>
    )
}

export default Map;