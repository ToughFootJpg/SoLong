import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationInfo } from '../types';
import L from 'leaflet';

// Fix for default marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LocationMapProps {
  location: LocationInfo;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, className = '' }) => {
  // Default to a fallback position if no coordinates are provided
  const position: [number, number] = location.latitude && location.longitude 
    ? [location.latitude, location.longitude] 
    : [0, 0]; // Default to 0,0 (null island) if no coordinates
  
  const hasCoordinates = location.latitude !== undefined && location.longitude !== undefined;
  
  if (!hasCoordinates) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ height: '200px' }}>
        <p className="text-gray-500">No location data available</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <MapContainer 
        center={position} 
        zoom={5} 
        style={{ height: '200px', width: '100%', borderRadius: '0.5rem' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {location.city ? `${location.city}, ` : ''}
            {location.country || 'Unknown'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;