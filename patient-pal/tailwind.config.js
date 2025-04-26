/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",  // אם יש לך קובץ index.html בפרויקט
      "./src/**/*.{js,jsx,ts,tsx}",  // אם אתה עובד עם React, כל הקבצים ב-src
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  