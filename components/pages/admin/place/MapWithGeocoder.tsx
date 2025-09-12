import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";


interface MapWithGeocoderProps {
  location: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const MapWithGeocoder: React.FC<MapWithGeocoderProps> = ({ location, setFieldValue }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2hhbWlrYXByYXNhZCIsImEiOiJjbWY3dzVoZ2wwMGtqMmlxeWE0bDByMjgwIn0.gdzPuIG1TWsSTYBHC-fzPg";

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard",
        center: [79.8612, 6.9271],
        zoom: 13,
      });
    }

    if (mapRef.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });
      geocoderRef.current = geocoder;
      mapRef.current.addControl(geocoder);

      geocoder.on("result", (e: { result: any }) => {
        const coords = e.result.geometry.coordinates;
        setFieldValue("location", e.result.place_name);
        setFieldValue("longitude", coords[0]);
        setFieldValue("latitude", coords[1]);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [setFieldValue]);

  // Sync Formik location to geocoder input
  useEffect(() => {
    if (geocoderRef.current && location) {
      // @ts-ignore
      geocoderRef.current.setInput(location);
    }
  }, [location]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
};

export default MapWithGeocoder;
