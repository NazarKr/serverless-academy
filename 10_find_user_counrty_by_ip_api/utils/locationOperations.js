const csv = require("csv-parser");
const ip = require("ip");
const path = require("node:path");
const { createReadStream } = require("node:fs");


const ipRecordsPath = path.resolve(
  "C:\\Users\\User\\Documents\\GitHub\\serverless-academy\\10_find_user_counrty_by_ip_api\\data\\IP2LOCATION-LITE-DB1.csv"
);

async function findLocationByIp(userIp) {
  const results = [];
  const parsedIp = ip.toLong(userIp);

  const getLocationFromList = new Promise((resolve, reject) => {
    createReadStream(ipRecordsPath)
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
