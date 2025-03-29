/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        trid: {
          lime: "#AFBD34",
          lime: {
            DEFAULT: "#AFBD34",
            light: "#C5D150",
            dark: "#8A9429",
          },
          teal: {
            DEFAULT: "#005768",
            light: "#0A7D91",
            dark: "#014351",
          },
          secondary: {
            DEFAULT: "#D6E2E3",
            light: "#68A8BC",
            dark: "#3B7286",
          },
          accent: {
            DEFAULT: "#81B5C7",
            light: "#A3C9D6",
            dark: "#5F99AE",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#005768',
              '&:hover': {
                color: '#014351',
              },
            },
            h1: {
              color: '#005768',
            },
            h2: {
              color: '#005768',
            },
            h3: {
              color: '#005768',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};