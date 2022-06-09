module.exports = {
    content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            sm: "576px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["dark"],
    },
};
