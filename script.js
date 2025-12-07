// 네 OpenWeatherMap API 키
const API_KEY = "f264480ae6d9cbe0a504866303f073b5";

// 도시별로 배경 이미지 바꿔주는 함수
function updateBackground(city) {
  const lowered = city.toLowerCase();
  let imageUrl = "";

  if (lowered.includes("seoul")) {
    // 서울 배경
    imageUrl =
      "url('https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1600&q=80')";
  } else if (lowered.includes("london")) {
    // 런던 배경
    imageUrl =
      "url('https://images.unsplash.com/photo-1471623320832-752e8bbf8413?auto=format&fit=crop&w=1600&q=80')";
  } else if (lowered.includes("new york") || lowered.includes("nyc")) {
    // 뉴욕 배경
    imageUrl =
      "url('https://images.unsplash.com/photo-1533108344127-a586d9dd8c5e?auto=format&fit=crop&w=1600&q=80')";
  } else {
    // 기본 도시 배경
    imageUrl =
      "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')";
  }

  document.body.style.backgroundImage = imageUrl;
}

// 오른쪽 아래 날씨 아이콘 바꾸는 함수
function updateIcon(weather) {
  const w = weather.toLowerCase();
  const icon = document.getElementById("weather-icon");

  if (w.includes("clear")) {
    // 맑음
    icon.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/869/869869.png')";
  } else if (w.includes("cloud")) {
    // 구름
    icon.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/414/414825.png')";
  } else if (w.includes("rain")) {
    // 비
    icon.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/1163/1163624.png')";
  } else if (w.includes("snow")) {
    // 눈
    icon.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/642/642102.png')";
  } else {
    // 기타
    icon.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/483/483361.png')";
  }
}

// 날씨 데이터 가져오기
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=kr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("도시를 찾을 수 없습니다.");
  }

  const data = await response.json();
  return data;
}

// 화면에 날씨 표시
function displayWeather(data) {
  const result = document.getElementById("result");
  result.classList.remove("error");
  result.innerHTML = `
    <p><strong>${data.name}</strong>의 현재 날씨</p>
    <p>온도: ${data.main.temp}°C</p>
    <p>체감 온도: ${data.main.feels_like}°C</p>
    <p>상태: ${data.weather[0].description}</p>
  `;

  // 도시 이름에 따라 배경 변경
  updateBackground(data.name);

  // 날씨(main)에 따라 아이콘 변경
  updateIcon(data.weather[0].main);
}

// 에러 표시
function handleError(error) {
  const result = document.getElementById("result");
  result.classList.add("error");
  result.innerHTML = `<p>${error.message}</p>`;
}

// 버튼 클릭 이벤트
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

// 페이지 처음 열렸을 때 기본 배경/아이콘 세팅
updateBackground("default");
updateIcon("default");
