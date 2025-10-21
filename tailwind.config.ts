export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#f9f6f1",
        foreground: "#1b1b1b",

        primary: {
          DEFAULT: "#3b6ea3",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#c29d63",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#497b50",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#e2d6c6",
          foreground: "#5c5349",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2d2d2d",
        },
        border: "#d3c7b8",
        ring: "#3b6ea3",
      },
    },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
