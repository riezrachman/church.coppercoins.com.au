<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/auth/sign-in', 'AuthController@signIn');
Route::post('/auth/sign-out', 'AuthController@signOut');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/dashboard/counter', 'DashboardController@counter');

    /* Start Category Resource */
    // 
    // Main
    // 
    // Route::get('/category', 'CategoryController@index');
    // Route::get('/category/{id}', 'CategoryController@show');
    Route::post('/category', 'CategoryController@store');
    Route::post('/category/{id}', 'CategoryController@update');
    Route::delete('/category/{id}', 'CategoryController@destroy');
    // 
    // Additional
    // 
    Route::get('/datatable/category', 'CategoryController@dataTable');
    // 
    /* End Category Resource */

    /* Start Organization Resource */
    // 
    // Main
    // 
    // Route::get('/organization', 'OrganizationController@index');
    // Route::get('/organization/{id}', 'OrganizationController@show');
    Route::post('/organization', 'OrganizationController@store');
    Route::post('/organization/{id}', 'OrganizationController@update');
    Route::delete('/organization/{id}', 'OrganizationController@destroy');
    // 
    // Additional
    // 
    Route::get('/datatable/organization', 'OrganizationController@dataTable');
    Route::post('/auth/organization', 'OrganizationController@updateOrCreateAsUser');
    // 
    /* End Organization Resource */

    /* Start Campaign Resource */
    // 
    // Main
    // 
    // Route::get('/campaign', 'CampaignController@index');
    // Route::get('/campaign/{id}', 'CampaignController@show');
    Route::post('/campaign', 'CampaignController@store');
    Route::post('/campaign/{id}', 'CampaignController@update');
    Route::delete('/campaign/{id}', 'CampaignController@destroy');
    // 
    // Additional
    // 
    Route::get('/datatable/campaign', 'CampaignController@dataTable');
    Route::post('/auth/campaign', 'CampaignController@updateOrCreateAsUser');
    // 
    /* End Campaign Resource */

    /* Start User Resource */
    // 
    // Main
    // 
    Route::get('/user', 'UserController@index');
    Route::get('/user/{id}', 'UserController@show');
    Route::post('/user', 'UserController@store');
    Route::post('/user/{id}', 'UserController@update');
    Route::delete('/user/{id}', 'UserController@destroy');
    // 
    // Additional
    // 
    Route::get('/datatable/user', 'UserController@dataTable');
    // 
    /* End User Resource */

});

Route::get('/bank', 'BankController@index');

Route::get('/category', 'CategoryController@index');
Route::get('/category/{id}', 'CategoryController@show');

Route::get('/campaign', 'CampaignController@index');
Route::get('/campaign/{id}', 'CampaignController@show');
