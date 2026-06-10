import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const REFRESH_INTERVAL = 10000; // 10 seconds

const Detail = ({ selectBusNumber }) => {
  const [busDetail, setBusDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDetails = useCallback(async (isBackground = false) => {
    if (isBackground) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setError("");
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/getBuses/${selectBusNumber}`
      );
      if (res.data) {
        setBusDetail(res.data);
        setLastUpdated(new Date());
      } else {
        setError("No details found for this bus.");
      }
    } catch (err) {
      console.error("Error fetching bus details:", err);
      if (!isBackground) setError("Failed to load bus details.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectBusNumber]);

  useEffect(() => {
    if (!selectBusNumber) {
      setBusDetail(null);
      setLoading(false);
      return;
    }

    fetchDetails(false);

    const interval = setInterval(() => fetchDetails(true), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [selectBusNumber, fetchDetails]);

  if (loading) {
    return (
      <div className="mt-8 max-w-lg mx-auto text-center text-gray-400 animate-pulse">
        Loading bus details...
      </div>
    );
  }

  if (error) {
    return <p className="mt-8 text-center text-red-500 font-medium">{error}</p>;
  }

  if (!busDetail) return null;

  const availableSeats = busDetail.No_of_seates - busDetail.personCount;

  return (
    <div className="mt-8 max-w-lg mx-auto w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 overflow-hidden">

      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🚌 Bus {busDetail.BusNumber}
        </h2>

        {/* Live indicator */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
          <span className={`w-2 h-2 rounded-full ${refreshing ? "bg-amber-400 animate-ping" : "bg-green-400 animate-pulse"}`} />
          <span className="text-xs text-gray-300 font-medium">
            {refreshing ? "Updating..." : "Live"}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-gray-400 font-medium">From</span>
          <span className="text-white font-semibold">{busDetail.FromLocation}</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-gray-400 font-medium">To</span>
          <span className="text-white font-semibold">{busDetail.ToLocation}</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-gray-400 font-medium">Total Passengers</span>
          <span className="text-white font-semibold">{busDetail.personCount}</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-gray-400 font-medium">Total Seats</span>
          <span className="text-white font-semibold">{busDetail.No_of_seates}</span>
        </div>

        {/* Available seats with visual bar */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Available Seats</span>
            <span className={`font-bold text-lg ${availableSeats > 0 ? "text-green-400" : "text-red-400"}`}>
              {availableSeats > 0 ? availableSeats : "Full"}
            </span>
          </div>
          {/* Capacity bar */}
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                availableSeats <= 0
                  ? "bg-red-500"
                  : availableSeats <= busDetail.No_of_seates * 0.25
                  ? "bg-amber-400"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min((busDetail.personCount / busDetail.No_of_seates) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span className={availableSeats <= 0 ? "text-red-400" : availableSeats <= busDetail.No_of_seates * 0.25 ? "text-amber-400" : "text-green-400"}>
              {Math.round((busDetail.personCount / busDetail.No_of_seates) * 100)}% full
            </span>
            <span>{busDetail.No_of_seates}</span>
          </div>
        </div>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="mt-5 text-center text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()} · refreshes every 10s
        </p>
      )}
    </div>
  );
};

export default Detail;
