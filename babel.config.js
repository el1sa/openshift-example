module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    plugins: [
      [
        "inline-dotenv",
        {
          path: "path/to/.env", // See motdotla/dotenv for more options
        },
      ],
    ],
  };
};
