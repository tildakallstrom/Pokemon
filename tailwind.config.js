/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/*.{html,ts}',
    './src/**/*.{ts, html}',
    './src/app/components/*/*.{html,ts}',
    './src/app/pages/*/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
