"use client"

import { TextField } from "@radix-ui/themes"
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef, useState } from "react";

const MapSelector: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }

  useEffect(() => {
    createMap()
  }, [createMap]);

  return (
    <div className="component-wrapper">
      <TextField />
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

    </div>
  )
}

export default MapSelector;