export async function fetchWeather(city) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Weather data fetch failed");
  }

  return response.json();
}
