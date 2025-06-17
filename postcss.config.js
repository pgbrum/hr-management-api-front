// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'), // Use 'require' para carregar o Tailwind CSS como um plugin
    require('autoprefixer'),
  ],
};