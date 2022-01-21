const defaults = require("tailwindcss/defaultTheme");

function withOpacity(variable) {
  return (data) => {
    if (data.opacityValue !== undefined)
      return `rgba(var(${variable}), ${data.opacityValue})`;
    return `rgb(var(${variable}))`;
  };
}

module.exports = {
  content: ["apps/web/components/**/*.tsx", "apps/web/pages/**/*.tsx"],
  theme: {
    screens: {
      xs: "450px",
      ...defaults.screens,
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      pacifico: ["Pacifico", "cursive"],
    },
    dropShadow: {
      "example-big": "0 10px 23px rgba(0, 0, 0, 0.15)",
      "example-small": "0 5px 15px rgba(0, 0, 0, 0.3)",
    },
    extend: {
      colors: {
        background: {
          DEFAULT: withOpacity("--bg"),
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
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
