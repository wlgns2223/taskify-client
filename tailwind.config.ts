import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5534DA",
      },
      maxWidth: {
        pc: "1920px",
        tablet: "720px",
        mobile: "375px",
      },
      minWidth: {
        mobile: "375px",
      },
      backgroundImage: {
        "section-one": "url('/images/section_one.png')",
      },
    },
  },
  plugins: [],
};
export default config;
