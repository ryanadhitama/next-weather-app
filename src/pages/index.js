import { useState } from "react";
import { fetchWeather } from "@/libs/services/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setWeather(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4">
      <h2 className="mb-6 text-3xl font-medium">Weather App</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded shadow-md"
      >
        <label className="w-full mb-2">City</label>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 w-full"
        >
          Get Weather
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {weather && (
        <div className="w-full max-w-md p-4 mt-4 bg-white rounded shadow-md">
          <h3 className="mb-2 text-xl font-bold">{weather.name}</h3>
          <p className="mb-2 text-gray-700">{weather.weather[0].description}</p>
          <p className="text-2xl font-bold">{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}
