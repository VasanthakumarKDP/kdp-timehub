/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/preline/dist/*.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        Exo: "Exo",
      },
      colors: {
        lightblue: "#9eacfb",
        darkblue: "#4338ca",
        tablelight: "#f1f3fe",
        tabledark: "#e3e7fe",
      },
    },
  },

  plugins: [
    require("flowbite/plugin", "tailwind-scrollbar"),
    require("preline/plugin"),
  ],
};
