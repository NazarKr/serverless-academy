export const startOption = {
  reply_markup: JSON.stringify({
    keyboard: [[{ text: "Weather in Wakanda" }]],
  }),
};

export const weatherOptions = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "at intervals of 3 hours" }],
      [{ text: "at intervals of 6 hours" }],
    ],
  }),
};
