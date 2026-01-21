/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // ← ここを "@tailwindcss/postcss" から "tailwindcss" に戻す
    autoprefixer: {},
  },
};

export default config;