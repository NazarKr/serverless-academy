const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserData = () => {
  readline.question(
    `
    Hello.
    Enter 10 words or digits deviding them in spaces: 
    To exit from program - enter 'exit'.
    >`,
    (data) => {
      if (data === "exit") {
        console.log("Good bye! Come back again!");
        readline.close();
      } else {
        const datas = data.split(" ");
        CLI_Options(datas);
      }
    }
  );
};

const CLI_Options = (data) => {
  readline.question(
    `
    Enter (1 - 5) to choose option.
    1. Words by name (from A to Z)
    2. Show numbers from lesser to greater
    3. Show numbers from bigger to smaller
    4. Display words in ascending order by number of letters in the word
    5. Show only unique words
    6. Display only unique values from the set of words and numbers entered by the user

    To return to the previous page, enter - "exit"

    How would you like to sort values:
    >`,
    (option) => {
      switch (option) {
        case "1":
          data = data.filter((item) => isNaN(item)).sort();
          console.log(data);
          break;

        case "2":
          data = data.filter((item) => !isNaN(item)).sort((a, b) => a - b);
          console.log(data);
          break;

        case "3":
          data = data.filter((item) => !isNaN(item)).sort((a, b) => b - a);
          console.log(data);
          break;

        case "4":
          data = data
            .filter((item) => isNaN(item))
            .sort((a, b) => a.length - b.length);
          console.log(data);
          break;

        case "5":
          let uniqArray = [...new Set(data)];
          uniqArray = uniqArray.filter((item) => isNaN(item));
          console.log(uniqArray);
          break;

        case "6":
          console.log([...new Set(data)]);
          break;

        case "exit":
          break;

        default:
          console.log("\n Erorr. Wrong input.");
          CLI_Options(data);
          return;
      }
      getUserData();
    }
  );
};

getUserData();
