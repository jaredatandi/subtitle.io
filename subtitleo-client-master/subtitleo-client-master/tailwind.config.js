module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        primary: "#084A9B",
        secondary: "#343434",
      },
      fontFamily: {
        rhd: ["Red Hat Display", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        xl: { min: "1279px" },
        lg: { max: "1023px", min: "768px" },
        md: { max: "767px", min: "640px" },
        sm: { max: "639px" },
      },
      colors: {
        primary: "#F6F6F6",
        secondary: "#D0D0D066",
        ternary: "#084A9B",
      },
      animation: {
        "bounce-slow": "bounce 2s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
