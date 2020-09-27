<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'ItemController@index')->name('items.index');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/', 'ItemController@store')->name('items.store');
    Route::match(['put', 'patch'], '/{id}', 'ItemController@update')->name('items.update');
    Route::delete('/{id}', 'ArticleController@delete')->name('items.delete');
});