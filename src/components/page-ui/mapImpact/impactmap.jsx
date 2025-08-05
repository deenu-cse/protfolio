'use client';
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

const ImpactMap = () => {
  const locations = [
    { lat: 29.9457, lng: 78.1642, title: "Haridwar Kumbh Mela", type: "health" },
    { lat: 30.0668, lng: 78.2678, title: "Haridwar Relief Work", type: "disaster" },
    { lat: 29.3919, lng: 79.4541, title: "Kedarnath Relief 2013", type: "disaster" },
    { lat: 30.3165, lng: 78.0322, title: "Dehradun Health Camps", type: "health" },
    { lat: 29.2150, lng: 79.5171, title: "Rudraprayag Rehabilitation", type: "rehab" },
    { lat: 29.9615, lng: 78.6561, title: "Pauri Garhwal Aid", type: "health" },
    { lat: 30.1290, lng: 78.3023, title: "SIDCUL Afforestation", type: "environment" },
    { lat: 29.9869, lng: 78.1799, title: "Ganga Cleanup", type: "environment" },
    { lat: 30.4598, lng: 77.7728, title: "COVID Relief Dehradun", type: "health" },
    { lat: 29.3919, lng: 79.4541, title: "Kedarnath Memorial", type: "memorial" }
  ];

  const mapStyles = useMemo(() => ([
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#444444" }]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#b3e0ff" }]
    }
  ]), []);

  const getMarkerIcon = (type) => {
    const icons = {
      health: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      disaster: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      rehab: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      environment: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      memorial: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
    };
    return icons[type] || "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  };

  return (
    <div className="h-[500px] w-[60%] flex justify-center mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 z-10 pointer-events-none"></div>
      
      <LoadScript 
        googleMapsApiKey="AIzaSyBYx_KSyPCJlnBsQLVFH2CeKQKO11iqToI"
        loadingElement={<div className="h-full w-full bg-gray-200 animate-pulse"></div>}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 30.0668, lng: 79.0193 }}
          zoom={8}
          options={{ styles: mapStyles }}
        >
          {locations.map((loc, i) => (
            <MarkerF 
              key={i} 
              position={{ lat: loc.lat, lng: loc.lng }} 
              icon={{
                url: getMarkerIcon(loc.type),
                scaledSize: { width: 32, height: 32 }
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/20">
        <h3 className="font-bold text-lg text-gray-800">Dr. Chaudhary's Impact Across Uttarakhand</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span className="text-xs font-medium text-black">Health Camps</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
            <span className="text-xs font-medium text-black">Disaster Relief</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span className="text-xs font-medium text-black">Rehabilitation</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span className="text-xs font-medium text-black">Environment</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow backdrop-blur-sm border border-white/20">
        <h4 className="font-semibold text-sm text-gray-700">Uttarakhand Impact Zones</h4>
      </div>
    </div>
  );
};

export default ImpactMap;