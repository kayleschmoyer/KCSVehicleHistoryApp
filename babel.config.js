module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'], // Ensure Expo preset is included
      plugins: ['react-native-reanimated/plugin'], // Add reanimated plugin
    };
  };  