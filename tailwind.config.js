/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121317",
        muted: "#5F6368",
        line: "#E3E5E8",
        surface: "#F4F5F7",
        amber: { DEFAULT: "#F5A524", soft: "#FFE7BF" },
        mint: { DEFAULT: "#1FAF7A", soft: "#D4F5E6" },
        sky: { DEFAULT: "#3B82F6", soft: "#DCE9FF" },
        lilac: { DEFAULT: "#8B5CF6", soft: "#EDE4FF" },
        coral: { DEFAULT: "#EF5A4C", soft: "#FFE1DD" },
      },
      fontFamily: {
        sans: ['"Google Sans Flex"', '"Google Sans"', "Figtree", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: { tightest: "-0.035em" },
    },
  },
  plugins: [],
};
