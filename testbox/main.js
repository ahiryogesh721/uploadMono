const { SimpleLinearRegression } = require("ml-regression");

// Your dataset
const data = [
  1, 3, 8, 1, 3, 2, 13, 6, 2, 4, 1, 3, 5, 6, 8, 4, 1, 3, 1, 3, 5, 7, 9, 1, 3, 4,
  5, 2, 6,
];

// Create a simple linear regression model
const regression = new SimpleLinearRegression(data.slice(0, -1), data.slice(1));

// Predict the next number
const nextNumber = regression.predict(1);

console.log("Predicted next number:", nextNumber);
