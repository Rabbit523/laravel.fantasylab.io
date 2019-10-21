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