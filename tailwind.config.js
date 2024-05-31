/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/preline/dist/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        Exo: "Exo",
      },
    },
  },

  plugins: [
    require("flowbite/plugin", "tailwind-scrollbar"),
    require("preline/plugin"),
  ],
};
