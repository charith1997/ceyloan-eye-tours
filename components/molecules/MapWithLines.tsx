import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

// Use environment variable for Mapbox token to avoid committing secrets.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

export default function MapWithLines({ places }: { places: any[] }) {
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
        // Parse coordinates to ensure they're numbers
        const coords: [number, number] = [
          parseFloat(location.coordinates[0]),
          parseFloat(location.coordinates[1]),
        ];

        // Create marker with color if specified, otherwise default
        const marker = new mapboxgl.Marker({
          color: location.color || "#cd1a40",
          scale: 1,
        })
          .setLngLat(coords)
          .addTo(map.current!);

        // Create tooltip popup with enhanced styling
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

        // Get marker element
        const markerElement = marker.getElement();

        // Style the marker element
        markerElement.style.cursor = "pointer";
        markerElement.style.transition = "transform 0.2s ease";
        markerElement.style.willChange = "transform";

        // Add hover effects
        markerElement.addEventListener("mouseenter", (e) => {
          e.stopPropagation();
          popup.setLngLat(coords).addTo(map.current!);
          // markerElement.style.transform = "scale(1.2)";
        });

        markerElement.addEventListener("mouseleave", (e) => {
          e.stopPropagation();
          popup.remove();
          // markerElement.style.transform = "scale(1)";
        });
      });

      // Add line connecting markers with parsed coordinates
      const coordinates = places.map((location) => [
        parseFloat(location.coordinates[0]),
        parseFloat(location.coordinates[1]),
      ]);

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
          "line-color": "#cd1a40",
          "line-width": 3,
          "line-opacity": 0.8,
        },
      });

      // Add animated dashed line on top
      map.current!.addLayer({
        id: "route-dashed",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff803c",
          "line-width": 2,
          "line-dasharray": [2, 4],
          "line-opacity": 0.6,
        },
      });
    });
  }, [places]);

  return (
    <div className="relative">
      {/* Map Header */}
      <div className="mb-4 flex items-center gap-2 px-4 lg:px-0">
        <MapPin className="w-6 h-6 text-red" />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          Journey Map
        </h3>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 group">
        {/* Decorative gradient overlay on edges */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        <div
          ref={mapContainer}
          className="w-full transition-all duration-500 group-hover:brightness-105"
          style={{
            height: "500px",
          }}
        />

        {/* Info Badge */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-red to-orange rounded-full animate-pulse" />
            <span className="font-semibold text-gray-700">
              {places.length} stops on this journey
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red rounded-full" />
          <span>Route</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-700" />
          <span>Destinations</span>
        </div>
      </div>
    </div>
  );
}
