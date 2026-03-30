import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: "#C9A86A",
          black: "#0A0A0A",
          white: "#FAFAFA"
        }
      }
    }
  },
  plugins: []
};

export default config;
