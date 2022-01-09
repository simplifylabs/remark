function withOpacity(name) {
  return (data) => {
    if (data.opacityValue !== undefined)
      return `rgba(var(${name}), ${data.opacityValue})`;
    return `rgb(var(${name}))`;
  };
}

module.exports = {
  content: ["./apps/browser/src/**/*.tsx"],
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
          form: withOpacity("--bg-form"),
          card: withOpacity("--bg-card"),
        },
        brand: {
          100: withOpacity("--brand-100"),
          700: withOpacity("--brand-700"),
          light: withOpacity("--brand-light"),
          DEFAULT: withOpacity("--brand"),
        },
      },
      boxShadow: {
        sidebar: "0 0 4px rgba(0, 0, 0, 0.15)",
      },
      cursor: {
        "col-resize": "col-resize",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
