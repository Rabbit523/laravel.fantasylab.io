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
   Route::get('/front/get-reviews', 'Api\PagesController@getReviews');
   Route::post('/admin/create-review', 'Api\PagesController@createReview');
   Route::post('/admin/update-review', 'Api\PagesController@updateReview');
   Route::post('/admin/delete-review', 'Api\PagesController@deleteReview');

   Route::get('/admin/pages', 'Api\PagesController@getPages');
   Route::post('/admin/update-page', 'Api\PagesController@updatePage');   
});
