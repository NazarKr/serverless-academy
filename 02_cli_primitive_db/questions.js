export const startQuestions = [
  {
    type: "input",
    name: "userName",
    message: "Enter the user`s name. To cancel press ENTER ",
    default: "Enter",
  },
];

export const userInfoQuestions = [
  {
    type: "rawlist",
    name: "userGender",
    message: "Enter your Gender ",
    choices: ["Male", "Female"],
  },
  {
    type: "input",
    name: "userAge",
    message: "Enter your age: ",
    validate: function (value) {
      const isValidAge =
        /^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= 100;
      if (!isValidAge) {
        return "Age must be a positive integer between 0 and 100.";
      }
      return true;
    },
  },
];

export const loadDbQuestions = [
  {
    type: "confirm",
    name: "confirmDisplayDb",
    message: "Would you to search value in DB ? ",
    default: "Yes",
  },
];

export const searchUserQuestions = [
  {
    type: "input",
    name: "userName",
    message: "Enter the user`s name u wanna find in DB?",
  },
];
