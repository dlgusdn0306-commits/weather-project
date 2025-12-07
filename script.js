// 나중에 실제 API 키로 바꿀 예정
const API_KEY = "f264480ae6d9cbe0a504866303f073b5";

async function getWeather(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=kr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("도시를 찾을 수 없습니다.");
  }

  const data = await response.json();
  return data;
}

function displayWeather(data) {
  const result = document.getElementById("result");
  result.innerHTML = `
    <p><strong>${data.name}</strong>의 현재 날씨</p>
    <p>온도: ${data.main.temp}°C</p>
    <p>체감 온도: ${data.main.feels_like}°C</p>
    <p>상태: ${data.weather[0].description}</p>
  `;
}

function handleError(error) {
  const result = document.getElementById("result");
  result.innerHTML = `<p style="color:red;">${error.message}</p>`;
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    handleError(new Error("도시를 입력하세요."));
    return;
  }

  getWeather(city)
    .then(displayWeather)
    .catch(handleError);
});
