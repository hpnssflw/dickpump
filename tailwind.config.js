/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // or "class" if you want manual dark mode
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "chat-green": "#14532d",
        "chat-red": "#7f1d1d",
      },
    },
  },
  plugins: [],
};
