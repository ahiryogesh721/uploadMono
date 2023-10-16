const corsOptions = {
  origin: (origin, callback) => {
    if (true) {
      callback(null, true);
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
