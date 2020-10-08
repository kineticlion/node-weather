const axios = require("axios");

const weatherstack = axios.create({
  baseURL: "http://api.weatherstack.com",
  timeout: 3000,
});

const forecast = async (latitude, longitude, location, callback) => {
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return callback(`Unable to find location. Try another search`, undefined);
  }

  try {
    const data = (
      await weatherstack.get(
        `/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${latitude},${longitude}`
      )
    ).data.current;

    if (!data)
      return callback(`Unable to find location. Try another search`, undefined);
    const { temperature, feelslike } = data;
    return callback(
      undefined,
      `${location}. Temperature is ${temperature} degree Celcius. Feels like ${feelslike} degree Celcius.`
    );
  } catch (error) {
    return callback(`Unable to connect to WeatherStack Service.`, undefined);
  }
};

module.exports = { weatherstack, forecast };
