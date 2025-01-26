module.exports = {
  content: [
    './web/**/*.html',          // فقط فایل‌های وب
    './web/assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        neutralcolor: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",

        },
        success: {
          100: "var(--success-100)",
          200: "var(--success-200)",
          300: "var(--success-300)",
          400: "var(--success-400)",
          500: "var(--success-500)",
        }, 
        error: {
          100: "var(--error-100)",
          200: "var(--error-200)",
          300: "var(--error-300)",
          400: "var(--error-400)",
          500: "var(--error-500)",
        }, 
        txtneutral: {
           200: "var(--txtneutral-200)",
           400: "var(--txtneutral-400)",
           500: "var(--txtneutral-500)",
           900: "var(--txtneutral-900)",
        }, 
        shade: {
           0: "var(--shade-0)",
           1000: "var(--shade-1000)",
        }, 

      },
      fontFamily: {
        yekanbakhblackFA: ["Yekan_Bakh_Black_fa"],
        yekanbakhextrablackFA: ["Yekan_Bakh_ExtraBlack_fa"],
        yekanbakhextraboldFA: ["Yekan_Bakh_ExtraBold_fa"],
        yekanbakhboldFA: ["Yekan_Bakh_Bold_fa"],
        yekanbakhsemiboldFA: ["Yekan_Bakh_SemiBold_fa"],
        yekanbakhthinFA: ["Yekan_Bakh_Thin_fa"],
        yekanbakhlightFA: ["Yekan_Bakh_Light_fa"],
        yekanbakhregularFA: ["Yekan_Bakh_Regular_fa"],
      },
    },
  },
  plugins: [],
};
