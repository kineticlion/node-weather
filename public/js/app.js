console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const input = document.querySelector(".input");
const apiData = document.querySelector("#api-data");
const apiError = document.querySelector("#api-error");

const fetchWeather = async (location) =>
  (await fetch(`/weather?address=${location}`)).json();

weatherForm.addEventListener("submit", (e) => {
  apiError.innerHTML = "";
  apiData.innerHTML = "Loading...";
  e.preventDefault();
  const location = input.value;

  fetchWeather(location).then((res) => {
    input.value = "";
    if (res.error) {
      apiData.innerHTML = "";
      return (apiError.innerHTML = res.error);
    }
    apiData.innerHTML = res.data;
  });
});
