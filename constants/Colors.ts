const baseColors = {
  graphite: "#2B2B2B", // Graphite
  magenta: "#E91E63",  // Magenta
  grey50: "#7E7E7E",   // Grey 50%
  grey30: "#B3B3B3",   // Grey 30%
  grey15: "#F9F9F9",   // Grey 15%
  white: "#FFFFFF",    // Pure White
  black: "#000000",    // Pure Black
};

const lightTheme = {
  background: baseColors.white,
  text: baseColors.graphite,
  primary: baseColors.magenta,
  secondary: baseColors.grey50,
  border: baseColors.grey30,
  cardBackground: baseColors.grey15,
  placeholder: baseColors.grey50,
};

const darkTheme = {
  background: baseColors.graphite,
  text: baseColors.white,
  primary: baseColors.magenta,
  secondary: baseColors.grey50,
  border: baseColors.grey30,
  cardBackground: "#1D1D1D", // Darker Graphite
  placeholder: baseColors.grey30,
};

export const Colors = {
  light: lightTheme,
  dark: darkTheme,
  base: baseColors,
};