const csv = require("csv-parser");
const ip = require("ip");
const path = require("path");
const { createReadStream } = require("node:fs");

const ipLocationPath = path.resolve("data/IP2LOCATION-LITE-DB1.csv");

async function findLocationByIp(userIp) {
  const results = [];
  const parsedIp = ip.toLong(userIp);

  const getLocationFromList = new Promise((resolve, reject) => {
    createReadStream(ipLocationPath)
      .pipe(csv())
      .on("error", (error) => {
        reject(error);
      })
      .on("data", (data) => {
        const { ip1, ip2 } = data;
        const startToLong = ip.toLong(ip1);
        const endToLong = ip.toLong(ip2);
        if (parsedIp >= startToLong && parsedIp <= endToLong) {
          results.push(data);
        }
      })
      .on("end", () => resolve(results[0]));
  });
  return await getLocationFromList;
}

module.exports = { findLocationByIp };
