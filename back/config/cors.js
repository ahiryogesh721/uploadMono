const allowedOrigins = ["http://localhost:3000","https://1x-bet.in/en","https://www.google.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (true) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
