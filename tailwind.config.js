/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // src 폴더 내의 모든 .js, .jsx, .ts, .tsx 파일을 스캔
    "./src/**/*.{js,jsx,ts,tsx}",
    // public/index.html도 스캔
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
