import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSafetyStore } from '../../store/safetyStore';
import { MapPin, AlertTriangle } from 'lucide-react';

const redIcon = new DivIcon({
  className: 'pulse-marker',
  html: '<div style="background-color: red; border-radius: 50%; width: 25px; height: 25px; border: 2px solid white;"></div>',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

export function SafetyMap() {
  const reports = useSafetyStore((state) => state.reports);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Safety Map</h2>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span>Safe Zone</span>
          </span>
          <span className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Reported Incident</span>
          </span>
        </div>
      </div>
      <div className="w-full h-[600px] rounded-lg shadow-lg">
        <MapContainer
          center={[51.5074, -0.1278]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Tile Layer for OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Add markers for reports */}
          {reports.map((report, index) => (
            <Marker
              key={index}
              position={[report.location.lat, report.location.lng]}
              icon={redIcon}
            >
              <Popup>{report.type}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}