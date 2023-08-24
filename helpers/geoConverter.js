import axios from "axios";

export const geoConverter = async (location) => {
  const { latitude, longitude } = location;
  console.log(latitude, longitude);
  const api_key = "9ec73d1260084c0db409245b2aa3c2bb";

  const api_url = "https://api.opencagedata.com/geocode/v1/json";
  const request_url =
    api_url +
    "?" +
    "key=" +
    api_key +
    "&q=" +
    encodeURIComponent(location) +
    "&pretty=1" +
    "&no_annotations=1";
  try {
    const result = await axios.get(
      `${api_url}?q=${latitude}+${longitude}&key=${api_key}&pretty=1`
    );
    console.log("geoConverter:", result.data.results[0].formatted);
    const adressArray = result.data.results[0].formatted.split(", ");
    const stringAdress = `${adressArray[adressArray.length - 4]}, ${
      adressArray[adressArray.length - 1]
    }`;
    return stringAdress;
  } catch (error) {
    console.log("geo Error:", error);
  }
};
