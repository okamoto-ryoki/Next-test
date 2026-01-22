/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // srcフォルダを使っている場合（最近のNext.jsはほぼこれ）
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    
    // もしsrcフォルダを使っていない場合用（念のため入れておけば安心）
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}