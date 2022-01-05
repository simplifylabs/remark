function withOpacity(rgb) {
  return (data) => {
    if (data.opacityValue !== undefined)
      return `rgba(${rgb}, ${data.opacityValue})`;
    return `rgb(${rgb})`;
  };
}

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        background: {
          form: withOpacity("28, 30, 33"),
          card: withOpacity("28, 30, 33"),
        },
        brand: {
          light: withOpacity("104, 117, 237"),
          DEFAULT: withOpacity("99, 102, 241"),
        },
      },
      boxShadow: {
        sidebar: "0 0 4px rgba(0, 0, 0, 0.15)",
      },
      dropShadow: {
        fab: "0 5px 10px rgba(0, 0, 0, 0.3)",
      },
      cursor: {
        "col-resize": "col-resize",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
