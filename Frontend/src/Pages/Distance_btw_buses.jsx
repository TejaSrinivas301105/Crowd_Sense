import React, { useEffect, useState } from "react";

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
    }

export default function UserStatus() {
    const busId = "BUS120";
    const [user, setUser] = useState(null);
    const [bus, setBus] = useState(null);
    const [status, setStatus] = useState("Loading...");
    const [distance, setDistance] = useState(null);
    const [prevDistance, setPrevDistance] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
        setUser({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
        });
        });
    }, []);


    useEffect(() => {
        const interval = setInterval(async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/getBuses/location/${busId}`
            );
            if (!res.ok) throw new Error('Failed to fetch bus location');
            const data = await res.json();
            setBus(data);
        } catch (err) {
            console.error('Bus location fetch error:', err);
        }
        }, 5000);

    return () => clearInterval(interval);
  }, []);


    useEffect(() => {
    if (!user || !bus) return;

        const currDistance = getDistance(
        user.latitude,
        user.longitude,
        bus.latitude,
        bus.longitude
        );

    setDistance(currDistance.toFixed(2));

        if (prevDistance === null) {
        setStatus("Calculating…");
        } else if (currDistance < prevDistance) {
        setStatus("🟢 Bus is COMING to your stop");
        } else {
        setStatus("🔴 Bus is LEAVING or Already Passed");
        }

        setPrevDistance(currDistance);

        }, [user, bus]);

    return (
        <div style={{ padding: "20px", fontSize: "20px" }}>
        <h2>{status}</h2>

        {distance && (
            <p>🚍 Bus Distance from you: <b>{distance} km</b></p>
        )}
        </div>
    );
}
