const axios = require("axios");

const mapBox = axios.create({
  baseURL: "https://api.mapbox.com",
  timeout: 3000,
});

const geocode = async (address, callback) => {
  const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_TOKEN}`;
  try {
    //features is an array of results, [0] is the most relevant search
    const data = (await mapBox.get(url)).data.features[0];
    if (!data)
      return callback("Unable to find location. Try another search", undefined);
    const location = data.place_name;
    const [longitude, latitude] = data.center;
    return callback(undefined, { latitude, longitude, location });
  } catch (error) {
    return callback("Unable to connect to Mapbox Service.", undefined);
  }
};

module.exports = {
  mapBox,
  geocode,
};
