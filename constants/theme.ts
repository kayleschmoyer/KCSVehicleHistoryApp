const Theme = {
    colors: {
      primary: "#E91E63", // Magenta
      secondary: "#212121", // Graphite
      grey50: "#B3B3B3",   // Grey 50%
      grey30: "#D9D9D9",   // Grey 30%
      grey15: "#F2F2F2",   // Grey 15%
      background: "#FFFFFF", // White
      text: "#212121",       // Dark Grey
      success: "#4CAF50", // Green for success
      error: "#F44336", // Red for errors
      gradient: ["#E91E63", "#673AB7"] as [string, string],
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