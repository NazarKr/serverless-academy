const fs = require("fs");

const originalData = require("./data.json");

function transformData(originalData) {
  const transformedData = {};
  for (const entry of originalData) {
    const userId = entry.user._id;
    const userName = entry.user.name;

    if (!transformedData[userId]) {
      transformedData[userId] = {
        userId: userId,
        userName: userName,
        vacations: [],
      };
    }

    const vacation = {
      startDate: entry.startDate,
      endDate: entry.endDate,
    };

    transformedData[userId].vacations.push(vacation);
  }

  return Object.values(transformedData);
}

const transformedData = transformData(originalData);

console.log(JSON.stringify(transformedData, null, 2));
