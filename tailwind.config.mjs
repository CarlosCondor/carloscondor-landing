/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1152d4',
        surface: '#f9f9f9',
      },
      borderRadius: {
        custom: '8px',
      },
    },
  },
  plugins: [],
};
