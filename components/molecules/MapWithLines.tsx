import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hhbWlrYXByYXNhZCIsImEiOiJjbWY3dzVoZ2wwMGtqMmlxeWE0bDByMjgwIn0.gdzPuIG1TWsSTYBHC-fzPg";

export default function MapWithLines({ places }: { places: any[] }) {
  console.log("places in map", places);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [80.7, 7.5],
      zoom: 6,
    });

    map.current.on("load", () => {
      places.forEach((location, index) => {
        // Create marker with color if specified, otherwise default
        const marker = new mapboxgl.Marker(
          location.color ? { color: location.color } : undefined
        )
          .setLngLat(location.coordinates)
          .addTo(map.current!);

        // Create tooltip popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 25,
        }).setHTML(`
          <div style="
            padding: 12px;
            font-family: Arial, sans-serif;
            max-width: 250px;
          ">
            <h3 style="
              margin: 0 0 8px 0;
              color: #333;
              font-size: 16px;
              font-weight: bold;
            ">${location.name}</h3>
            <p style="
              margin: 0 0 6px 0;
              color: #666;
              font-size: 14px;
              font-style: italic;
            ">${location.description}</p>
            <p style="
              margin: 0;
              color: #888;
              font-size: 12px;
              line-height: 1.4;
            ">${location.details}</p>
          </div>
        `);

        // Add hover events to marker element
        const markerElement = marker.getElement();

        markerElement.addEventListener("mouseenter", () => {
          popup.setLngLat(location.coordinates).addTo(map.current!);
        });

        markerElement.addEventListener("mouseleave", () => {
          popup.remove();
        });

        // Optional: Change cursor on hover
        markerElement.style.cursor = "pointer";
      });

      // Add line connecting markers
      const coordinates = places.map((location) => location.coordinates);

      map.current!.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });

      map.current!.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "blue",
          "line-width": 2,
        },
      });
    });
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "40vh" }} />;
}
