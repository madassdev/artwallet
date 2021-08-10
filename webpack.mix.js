const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const domain = "artwallet.dv";
const homedir = require("os").homedir();

mix.js("resources/js/app.js", "public/js")
    .react()
    .js("resources/js/dashboard/src/index.js", "public/js/dashboard")
    .react()
    .sass("resources/css/app.scss", "public/css")
    .postCss("resources/css/app.css", "public/css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .webpackConfig(require("./webpack.config"));

if (mix.inProduction()) {
    mix.version();
}
// The mix script:
mix.browserSync({
    proxy: "https://" + domain,
    host: domain,
    open: "external",
    https: {
        key: homedir + "/.config/valet/Certificates/" + domain + ".key",
        cert: homedir + "/.config/valet/Certificates/" + domain + ".crt",
    },
});

mix.disableNotifications();
