const axios = require("axios");

const endPointsArray = [
  "http://localhost:3000/json-01",
  "http://localhost:3000/json-02",
  "http://localhost:3000/json-03",
  "http://localhost:3000/json-04",
  "http://localhost:3000/json-05",
  "http://localhost:3000/json-06",
  "http://localhost:3000/json-07",
  "http://localhost:3000/json-08",
  "http://localhost:3000/json-09",
  "http://localhost:3000/json-10",
  "http://localhost:3000/json-11",
  "http://localhost:3000/json-12",
  "http://localhost:3000/json-13",
  "http://localhost:3000/json-14",
  "http://localhost:3000/json-15",
  "http://localhost:3000/json-16",
  "http://localhost:3000/json-17",
  "http://localhost:3000/json-18",
  "http://localhost:3000/json-19",
  "http://localhost:3000/json-20",
];
//function to find a key and value in an object
function findKeyInObject(obj, keyToFind) {
  for (const key in obj) {
    if (key === keyToFind) {
      return obj[key];
    }
    if (typeof obj[key] === "object") {
      const result = findKeyInObject(obj[key], keyToFind);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
}

//сall the function as many times as we have links in the array
const jsonSorting = async (endPoints, retries = 3) => {
  let results = { trueValues: 0, falseValues: 0 };
  for (const obj of endPoints) {
    const endpointResults = await tryEndpoint(obj, retries);
    results.trueValues += endpointResults.trueValues;
    results.falseValues += endpointResults.falseValues;
  }
  console.log("Total True values: ", results.trueValues);
  console.log("Total False values: ", results.falseValues);
};
//we check each link for functionality and find out the value of isDone
const tryEndpoint = async (obj, retries = 3) => {
  let trueValues = 0;
  let falseValues = 0;
  try {
    const res = await axios.get(obj);
    const keyToFind = "isDone";
    const result = findKeyInObject(res.data, keyToFind);
    if (result == true) {
      trueValues += 1;
    } else {
      falseValues += 1;
    }
    console.log(
      ("[SUCCESS] ") + obj + " " + keyToFind + " - " + result
    );
  } catch (error) {
    if (retries > 0) {
      console.log(("[FAIL] ") + obj + " The endpoint is unavailable.");
      await tryEndpoint(obj, retries - 1);
    } else {
      console.log(("[FAIL] ") + obj + " The endpoint is unavailable");
    }
  }
  return { trueValues, falseValues };
};

jsonSorting(endPointsArray);

