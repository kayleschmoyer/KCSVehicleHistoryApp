const Theme = {
  colors: {
    primary: "#23A370",
    secondary: "#006A4E",
    grey50: "#B3B3B3",
    grey30: "#D9D9D9",
    grey15: "#F2F2F2",
    background: "#FFFFFF",
    text: "#2B2B2B",
    success: "#4CAF50",
    error: "#F44336",
    gradient: ["#23A370", "#006A4E"] as [string, string],
    magenta: "#E91E63",
  },
  fonts: {
    regular: "SpaceMono-Regular",
    bold: "SpaceMono-Bold",
  },
  glassEffect: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
};

export default Theme;
