import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const WETHER_TOKEN = process.env.WETHER_TOKEN;

const toMessage = (arr) => {
  return arr
    .map(
      ({ dt_txt, main }) =>
        `Time: ${dt_txt.split(" ")[1]}, Temp: ${Math.round(
          main.temp / 10
        )}° , Feels Like: ${Math.round(main.feels_like / 10)}°
      `
    )
    .join("");
};

export async function getWether(timeStep = 3) {
  try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=China&appid=${WETHER_TOKEN}`
    );
    const result = weather.data.list;
    if (timeStep === 6) {
      const filteredResult = result.filter((item, index) => index % 2 === 0);
      return toMessage(filteredResult);
    }
    return toMessage(result);
  } catch (error) {
    console.log(error);
  }
}
