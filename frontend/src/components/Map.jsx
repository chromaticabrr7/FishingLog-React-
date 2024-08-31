import React from 'react';

const Map = ({latitude, longitude}) => {
    const mapboxAccessToken = 'pk.eyJ1IjoiY2hyb21hdGljYWJycjciLCJhIjoiY2x5MjM4cjh3MTI2bTJqcHdjYm5tZ2J5biJ9.rZU3toaYtqPzl1txNz2Fkg';
    const mapStyle = 'mapbox/streets-v11';
    const lat = latitude;
    const lng = longitude;
    const zoom = 15;
    const width = 1200;
    const height = 800;

    const mapUrl = `https://api.mapbox.com/styles/v1/${mapStyle}/static/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${mapboxAccessToken}`;

    return (
        <div className='map-container'>
            <img src={mapUrl} alt="Mapbox Static Map" style={{ width: '100%', height: 'auto' }} />
        </div>
    );
}

export default Map;
