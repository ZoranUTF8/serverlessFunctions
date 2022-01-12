const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const alert = document.querySelector(".alert");
const result = document.querySelector(".result");
alert.style.display = "none";

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const city = input.value;

  if (city) {
    getWeatherData(city);
  } else {
    window.alert("Please enter a valid city name.");
  }
});

async function getWeatherData(city) {
  alert.style.display = "none";

  try {
    const { data } = await axios.post("/api/5-weather", { city });
    const { name } = data;
    const { country } = data.sys;
    const { temp_max, temp_min, feels_like } = data.main;
    const { description } = data.weather[0];
    result.innerHTML = `
    <article class="card">
    <h3>City name : ${name}</h3>
    <h3>Country : ${country}</h3>
    <p>${description}</p>
    <p>Min temp : ${temp_min}&#8451;</p>
    <p>Max temp : ${temp_max}&#8451;</p>
    <p>Feels like : ${feels_likes}&#8451;</p>
    </article>
    `;
  } catch (error) {
    alert.style.display = "block";
    alert.textContent = `Can not find weather data for city ${city}`;
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
}
