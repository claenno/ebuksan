/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('/images/loginBackground.png')",
        'custom-gradient': "radial-gradient(50% 50% at 50% 50%, #F7D826 0%, #F4BD18 53.5%, #F19903 100%)",
      },// Correct path for the public folder
    },
  },
  plugins: [],
};
