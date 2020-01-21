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
Route::get('/managed-hosting', 'PagesController@managedHosting');
Route::get('/features', 'PagesController@features');
Route::get('/about', 'PagesController@about');
Route::get('/blog', 'PagesController@blog');
Route::get('/contact', 'PagesController@contact');
Route::get('/privacy', 'PagesController@privacy');
Route::get('/security', 'PagesController@security');
Route::get('/terms', 'PagesController@terms');
Route::get('/confidentiality', 'PagesController@confidentiality');

Route::get('/no', 'PagesController@no_index');
Route::get('/no/logginn', 'PagesController@no_login');
Route::get('/no/start-prosjekt', 'PagesController@no_register');
Route::get('/no/portfolio', 'PagesController@no_portfolio');
Route::get('/no/portfolio/{type?}', 'PagesController@no_singlePortfolio');
Route::get('/no/webutvikling', 'PagesController@no_webDevelopment');
Route::get('/no/mobilutvikling', 'PagesController@no_mobileDevelopment');
Route::get('/no/ui-ux-design', 'PagesController@no_uiDesign');
Route::get('/no/merkevarebygging', 'PagesController@no_branding');
Route::get('/no/illustrasjon', 'PagesController@no_illustration');
Route::get('/no/markedsføringsmateriell', 'PagesController@no_marketingMaterial');
Route::get('/no/administrert-hosting', 'PagesController@no_managedHosting');
Route::get('/no/funksjoner', 'PagesController@no_features');
Route::get('/no/om-oss', 'PagesController@no_about');
Route::get('/no/blogg', 'PagesController@no_blog');
Route::get('/no/kontakt', 'PagesController@no_contact');
Route::get('/no/personvern', 'PagesController@no_privacy');
Route::get('/no/sikkerhet', 'PagesController@no_security');
Route::get('/no/avsnitt', 'PagesController@no_terms');
Route::get('/no/sikker', 'PagesController@no_confidentiality');

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
Route::get('/admin/single-page/service-hosting', 'PagesController@adminServiceHostingPage');
Route::get('/admin/single-page/features', 'PagesController@adminFeaturesPage');
Route::get('/admin/single-page/hosting', 'PagesController@adminHostingPage');
