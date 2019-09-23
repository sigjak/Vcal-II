module.exports = {
  plugins: [
    require("autoprefixer"),
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.vue", "./public/index.html"]
    })
  ]
};
