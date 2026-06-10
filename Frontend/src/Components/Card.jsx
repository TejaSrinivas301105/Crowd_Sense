import axios from "axios";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import Detail from "../Pages/Detail.jsx";
import VoiceSearch from "./VoiceSearch.jsx";

const Card = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [Buses, setBuses] = useState([]);
  const [selectbus, setSeleted] = useState(null);

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      setSeleted(null);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getBuses/${from}/${to}`);
      if (res.data && res.data.buses && res.data.buses.length > 0) {
        setBuses(res.data.buses);
      } else {
        setBuses([]);
      }
      console.log("Buses:", res.data.buses);
    } catch (e) {
      console.log("Error while fetching data!", e);
      setBuses([]);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-24 px-6  overflow-hidden">
      {/* Floating glow effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"></div>

      {/* Search Card */}
      <div className="relative bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl p-10 rounded-3xl w-full max-w-4xl overflow-hidden transition-all duration-500 hover:shadow-amber-500/20 hover:scale-[1.01]">
        {/* Background Image */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/040/171/979/small/ai-generated-luxury-coach-bus-on-highway-at-sunset-road-trip-travel-concept-photo.jpeg"
          alt="bus background"
          className="absolute inset-0 w-full h-full object-cover opacity-25 rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10 tracking-wide drop-shadow-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
            Plan Your Journey
          </h1>

          <form className="space-y-6" onSubmit={handlesubmit}>
            {/* From Input */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-100 mb-2 tracking-wide">From</label>
              <VoiceSearch onTextChange={setFrom} />
            </div>

            {/* Switch Icon */}
            <div className="flex justify-center">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-inner border border-white/20 hover:scale-110 transition-all duration-300">
                <ArrowDownUp className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* To Input */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-100 mb-2 tracking-wide">To</label>
              <VoiceSearch onTextChange={setTo} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Find My Bus
            </button>
          </form>
        </div>
      </div>

      {/* Results Card */}
      <div className="relative mt-12 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-8 rounded-2xl w-full max-w-4xl text-white transition-all duration-300 hover:shadow-amber-400/20">
        {Array.isArray(Buses) && Buses.length > 0 ? (
          <div className="mt-2">
            <h2 className="font-bold text-2xl text-amber-300 mb-5 tracking-wide">
              Available Buses
            </h2>
            <ul className="space-y-4">
              {Buses.map((bus, index) => (
                <li key={index}>
                  <button
                    className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
                    onClick={() => setSeleted(bus.BusNumber)}
                  >
                    {bus.BusNumber} – {bus.FromLocation} → {bus.ToLocation}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-gray-300 font-medium">
            No buses found 🚌
          </div>
        )}
      </div>

      {selectbus && <Detail selectBusNumber={selectbus} />}
    </div>
  );
};

export default Card;
