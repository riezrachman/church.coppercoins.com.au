<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::view('login', 'auth.login')->name('login');
Route::view('register', 'auth.register')->name('register');

Route::middleware(['auth:sanctum', 'email_verified'])->group(function(){

    Route::view('dashboard', 'pages.dashboard');
    Route::view('campaign-management', 'pages.campaign_management');
    Route::view('finance', 'pages.finance');
    Route::view('settings', 'pages.settings');
    Route::view('materials', 'pages.materials');

});

Route::view('/test/email/verification', 'emails.verification', ['user' => \App\Models\User::find(1)]);
