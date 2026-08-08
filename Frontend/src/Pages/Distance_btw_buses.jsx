import { useEffect, useState, useRef } from "react";
import { Navigation, Clock, Gauge, MapPin } from "lucide-react";

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calcETA(distanceKm, speedKmh) {
    if (!speedKmh || speedKmh <= 0) return null;
    const minutes = Math.round((distanceKm / speedKmh) * 60);
    if (minutes < 1) return "Less than 1 min";
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

export default function BusTracker({ busNumber }) {
    const [userLocation, setUserLocation]   = useState(null);
    const [busLocation, setBusLocation]     = useState(null);
    const [distance, setDistance]           = useState(null);
    const [eta, setEta]                     = useState(null);
    const [status, setStatus]               = useState(null);
    const [locationError, setLocationError] = useState("");
    const [noGpsData, setNoGpsData]         = useState(false);
    const prevDistanceRef                   = useRef(null);

    // Step 1 — get user's GPS once
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation not supported by your browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
            () => setLocationError("Location access denied. Please allow location to track bus.")
        );
    }, []);

    // Step 2 — poll bus GPS every 5 seconds
    useEffect(() => {
        if (!busNumber) return;

        async function fetchBusLocation() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/getBuses/location/${busNumber}`
                );
                if (res.status === 404) { setNoGpsData(true); return; }
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                setNoGpsData(false);
                setBusLocation(data);
            } catch (err) {
                console.error("Bus location fetch error:", err);
            }
        }

        fetchBusLocation();
        const interval = setInterval(fetchBusLocation, 5000);
        return () => clearInterval(interval);
    }, [busNumber]);

    // Step 3 — calculate distance, ETA, status whenever either location updates
    useEffect(() => {
        if (!userLocation || !busLocation) return;

        const dist = haversine(
            userLocation.latitude, userLocation.longitude,
            busLocation.latitude,  busLocation.longitude
        );

        setDistance(dist);
        setEta(calcETA(dist, busLocation.speed));

        if (prevDistanceRef.current === null) {
            setStatus("calculating");
        } else if (dist < prevDistanceRef.current) {
            setStatus("coming");
        } else {
            setStatus("leaving");
        }

        prevDistanceRef.current = dist;
    }, [userLocation, busLocation]);

    // ── UI ──────────────────────────────────────────────

    if (locationError) {
        return (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-400/30 rounded-xl text-red-400 text-sm text-center">
                📍 {locationError}
            </div>
        );
    }

    if (noGpsData) {
        return (
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm text-center">
                📡 No live GPS data from this bus yet
            </div>
        );
    }

    if (!userLocation || !busLocation || distance === null) {
        return (
            <div className="mt-4 p-3 text-center text-gray-500 text-sm animate-pulse">
                Locating bus...
            </div>
        );
    }

    const statusConfig = {
        coming:      { label: "Bus is coming to your stop",      color: "text-green-400",  bg: "bg-green-400/10 border-green-400/30",  dot: "bg-green-400" },
        leaving:     { label: "Bus is leaving / already passed", color: "text-red-400",    bg: "bg-red-400/10 border-red-400/30",      dot: "bg-red-400"   },
        calculating: { label: "Calculating direction...",         color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/30",  dot: "bg-amber-400" },
    };

    const s = statusConfig[status] || statusConfig.calculating;

    return (
        <div className="mt-4 space-y-3">

            {/* Status banner */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${s.bg}`}>
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0 ${s.dot}`} />
                <span className={`text-sm font-semibold ${s.color}`}>{s.label}</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">

                {/* Distance */}
                <div className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <Navigation className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold text-lg leading-none">
                        {distance < 1
                            ? `${Math.round(distance * 1000)}m`
                            : `${distance.toFixed(1)}km`}
                    </span>
                    <span className="text-gray-500 text-xs">Distance</span>
                </div>

                {/* ETA */}
                <div className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold text-lg leading-none">
                        {eta || "—"}
                    </span>
                    <span className="text-gray-500 text-xs">ETA</span>
                </div>

                {/* Speed */}
                <div className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <Gauge className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold text-lg leading-none">
                        {busLocation.speed || 0}
                        <span className="text-xs font-normal text-gray-400"> km/h</span>
                    </span>
                    <span className="text-gray-500 text-xs">Speed</span>
                </div>
            </div>

            {/* Last GPS update */}
            <p className="text-center text-xs text-gray-600">
                <MapPin className="inline w-3 h-3 mr-1" />
                Bus GPS updated: {new Date(busLocation.updatedAt).toLocaleTimeString()} · polls every 5s
            </p>
        </div>
    );
}
