/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./music/templates/*.html", "./music/templates/components/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        album_cover: "url('/media/{{ album.album_cover }}')",
      },
    },
    fontFamily: {
      sans: ["quicksand", "sans-serif"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      background: "#1D2123",
      primary: "#1A1E1F",
      sec: "#FACD66",
    }),
  },
  plugins: [require("daisyui")],
};
