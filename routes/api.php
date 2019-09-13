<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'password'],function() {
	Route::post('/email', 'Auth\ForgotPasswordController@getResetToken');
	Route::post('/reset', 'Auth\ResetPasswordController@reset');
});

Route::group(['prefix'=> 'auth'],function(){
    Route::post('/register','Auth\RegisterController@register');
    Route::post("/login",'Auth\LoginController@login');
    Route::post('/login/{social}/callback','Auth\LoginController@handleProviderCallback')->where('social','twitter|facebook|linkedin|google|');
});

Route::middleware(['prefix'=> 'api'])->group(function(){
   Route::get('/hello',function(){
       return response()->json("Cool dude");
   });

   Route::post('/front/get-page', 'Api\PagesController@getPage');
   Route::get('/front/get-portfolios', 'Api\PagesController@getPortfolios');
   Route::post('/front/get-portfolio-page', 'Api\PagesController@getPortfolioPage');
   Route::post('/admin/get-portfolio-page', 'Api\PagesController@getPortfolioPage');
   Route::post('/admin/create-portfolio', 'Api\PagesController@createPortfolio');
   Route::post('/admin/update-portfolio', 'Api\PagesController@updatePortfolio');
   Route::post('/admin/update-portfolio-page', 'Api\PagesController@updatePortfolioPage');
   Route::post('/admin/delete-portfolio-page', 'Api\PagesController@deletePortfolioPage');
   Route::post('/admin/add-portfolio-page', 'Api\PagesController@addPortfolioPage');
   Route::post('/admin/delete-portfolio', 'Api\PagesController@deletePortfolio');

   Route::get('/front/get-reviews', 'Api\PagesController@getReviews');
   Route::post('/admin/create-review', 'Api\PagesController@createReview');
   Route::post('/admin/update-review', 'Api\PagesController@updateReview');
   Route::post('/admin/delete-review', 'Api\PagesController@deleteReview');

   Route::get('/admin/pages', 'Api\PagesController@getPages');
   Route::post('/admin/update-page', 'Api\PagesController@updatePage');   

   Route::post('/send-message', 'Api\ApiController@sendMessage');
});
