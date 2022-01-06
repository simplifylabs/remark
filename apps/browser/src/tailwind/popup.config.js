function withOpacity(variable) {
  return (data) => {
    if (data.opacityValue !== undefined)
      return `rgba(var(${variable}), ${data.opacityValue})`;
    return `rgb(var(${variable}))`;
  };
}

module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        background: {
          light: withOpacity("--bg-light"),
          dark: withOpacity("--bg-dark"),
        },
        brand: {
          100: withOpacity("--brand-100"),
          700: withOpacity("--brand-700"),
          light: withOpacity("--brand-light"),
          DEFAULT: withOpacity("--brand"),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
