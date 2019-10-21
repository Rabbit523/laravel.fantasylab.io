let mix = require('laravel-mix');
require('laravel-mix-polyfill');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.autoload({
    jquery: ['$', 'jQuery', 'window.jQuery'],
   });
   
mix.react('resources/assets/js/app.js', 'public/js')
   .react('resources/assets/js/app-server.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .styles(['resources/assets/css/semantic-ui.css','resources/assets/css/animate.css'],'public/css/all.css')
    .polyfill({
        enabled: true,
        useBuiltIns: "usage",
        targets: {"firefox": "50", "ie": 11}
     });    
