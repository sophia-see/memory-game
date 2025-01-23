import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-fcf": "#FCFCFC",
        "white-f2f": "#F2F2F2",

        "yellow-fda": "#FDA214",
        "yellow-ffb": "#FFB84A",

        "blue-bcc": "#BCCED9",
        "blue-304": "#304859",
        "blue-152": "#152938",
        "blue-719": "#7191A5",
        "blue-639": "#6395B8",
      },
    },
  },
  plugins: [],
} satisfies Config;
