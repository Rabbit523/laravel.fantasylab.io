<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/redirect/{social}','Auth\LoginController@socialLogin')->where('social','twitter|facebook|linkedin|google');

// Route::get('{slug}', function() {
//     return view('home');
// })->where('slug', '(?!api)([A-z\d-\/_.]+)?');

Route::get('/', 'PagesController@index');
Route::get('/login', 'PagesController@login');
Route::get('/register', 'PagesController@register');
Route::get('/portfolio', 'PagesController@portfolio');
Route::get('/portfolio/{type?}', 'PagesController@singlePortfolio');
Route::get('/web-development', 'PagesController@webDevelopment');
Route::get('/mobile-development', 'PagesController@mobileDevelopment');
Route::get('/ui-ux-design', 'PagesController@uiDesign');
Route::get('/branding', 'PagesController@branding');
Route::get('/illustration', 'PagesController@illustration');
Route::get('/marketing-material', 'PagesController@marketingMaterial');
Route::get('/features', 'PagesController@features');
Route::get('/about', 'PagesController@about');
Route::get('/blog', 'PagesController@blog');
Route::get('/contact', 'PagesController@contact');
Route::get('/privacy', 'PagesController@privacy');
Route::get('/security', 'PagesController@security');
Route::get('/terms', 'PagesController@terms');
Route::get('/confidentiality', 'PagesController@confidentiality');

Route::get('/no', 'PagesController@no_index');
Route::get('/no/login', 'PagesController@no_login');
Route::get('/no/register', 'PagesController@no_register');
Route::get('/no/portfolio', 'PagesController@no_portfolio');
Route::get('/no/portfolio/{type?}', 'PagesController@no_singlePortfolio');
Route::get('/no/web-development', 'PagesController@no_webDevelopment');
Route::get('/no/mobile-development', 'PagesController@no_mobileDevelopment');
Route::get('/no/ui-ux-design', 'PagesController@no_uiDesign');
Route::get('/no/branding', 'PagesController@no_branding');
Route::get('/no/illustration', 'PagesController@no_illustration');
Route::get('/no/marketing-material', 'PagesController@no_marketingMaterial');
Route::get('/no/features', 'PagesController@no_features');
Route::get('/no/about', 'PagesController@no_about');
Route::get('/no/blog', 'PagesController@no_blog');
Route::get('/no/contact', 'PagesController@no_contact');
Route::get('/no/privacy', 'PagesController@no_privacy');
Route::get('/no/security', 'PagesController@no_security');
Route::get('/no/terms', 'PagesController@no_terms');
Route::get('/no/confidentiality', 'PagesController@no_confidentiality');

Route::get('/admin/pages', 'PagesController@adminPages');
Route::get('/admin/portfolio', 'PagesController@adminPortfolios');
Route::get('/admin/reviews', 'PagesController@adminReviews');
Route::get('/admin/legal', 'PagesController@adminLegal');
Route::get('/admin/single-page/home', 'PagesController@adminHomePage');
Route::get('/admin/single-page/portfolio', 'PagesController@adminPortfolioPage');
Route::get('/admin/single-page/single_portfolio', 'PagesController@adminSinglePortfolioPage');
Route::get('/admin/single-page/about', 'PagesController@adminAboutPage');
Route::get('/admin/single-page/contact', 'PagesController@adminContactPage');
Route::get('/admin/single-page/service-web', 'PagesController@adminServiceWebPage');
Route::get('/admin/single-page/service-mobile', 'PagesController@adminServiceMobilePage');
Route::get('/admin/single-page/service-ui', 'PagesController@adminServiceUIPage');
Route::get('/admin/single-page/service-branding', 'PagesController@adminServiceBrandingPage');
Route::get('/admin/single-page/service-illustration', 'PagesController@adminServiceIllustrationPage');
Route::get('/admin/single-page/service-market', 'PagesController@adminServiceMarketPage');
Route::get('/admin/single-page/features', 'PagesController@adminFeaturesPage');
