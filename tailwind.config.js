/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "card-bot":
            "linear-gradient(143deg, #90B9A1 1.49%, #3EAB7D 97.29%)",
        "search":
            "linear-gradient(37deg, #E6E6E6 12.22%, #FFF 91.94%)",
      },
    },
  },
  plugins: [],
}