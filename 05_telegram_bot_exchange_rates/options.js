export const startOption = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Weather in Wakanda" }],
      [{ text: "Check current exchange rates" }],
    ],
  }),
};

export const intervalOptions = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "at intervals of 3 hours" }],
      [{ text: "at intervals of 6 hours" }],
    ],
  }),
};

export const currentOption = {
  reply_markup: JSON.stringify({
    keyboard: [[{ text: "USD" }], [{ text: "EUR" }]],
  }),
};
