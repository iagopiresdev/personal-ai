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
      fontSize: {
        menuBar: ["12px", "16px"],
        bigIcon: ["45px", "50px"],
      },
      borderRadius:{
        xl: "28px"
      },
      backgroundImage: {
        "card-bot-gym":
            "linear-gradient(230deg, rgba(255,12,1,1) 0%, rgba(255,128,123,1) 50%, rgba(255,12,1,1) 100%)",
        "card-bot-meal":
            "linear-gradient(230deg, rgba(44,243,136,1) 0%, rgba(152,240,192,1) 50%, rgba(44,243,136,1) 100%)",
        "search":
            "linear-gradient(37deg, #E6E6E6 12.22%, #FFF 91.94%)",
      },
    },
  },
  plugins: [],
}