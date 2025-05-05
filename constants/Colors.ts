const baseColors = {
  forest: "#23A370",
  secondary: "#006A4E",
  graphite: "#2B2B2B",
  magenta: "#E91E63",
  grey50: "#7E7E7E",
  grey30: "#B3B3B3",
  grey15: "#F9F9F9",
  white: "#FFFFFF",
  black: "#000000",
};

const lightTheme = {
  background: baseColors.white,
  text: baseColors.graphite,
  primary: baseColors.forest,
  secondary: baseColors.secondary,
  border: baseColors.grey30,
  cardBackground: baseColors.grey15,
  placeholder: baseColors.grey50,
  tint: baseColors.magenta,
  icon: baseColors.graphite,
};

const darkTheme = {
  background: baseColors.graphite,
  text: baseColors.white,
  primary: baseColors.forest,
  secondary: baseColors.secondary,
  border: baseColors.grey30,
  cardBackground: "#1D1D1D",
  placeholder: baseColors.grey30,
  tint: baseColors.white,
  icon: baseColors.magenta,
};

export const Colors = {
  light: lightTheme,
  dark: darkTheme,
  base: baseColors,
};
