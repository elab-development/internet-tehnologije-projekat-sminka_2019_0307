<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', '\App\Http\Controllers\LoginController@login');
Route::post('/register', '\App\Http\Controllers\LoginController@register');

Route::apiResource('/types', '\App\Http\Controllers\TypeController')->only(['index', 'show']);
Route::apiResource('/services', '\App\Http\Controllers\ServiceController')->only(['index', 'show']);
Route::apiResource('/reservations', '\App\Http\Controllers\ReservationController')->only(['index', 'show']);

Route::get('/find', '\App\Http\Controllers\ServiceController@findByName');
Route::get('/grouped-data', '\App\Http\Controllers\ServiceController@groupByType');
Route::get('/free-slots', '\App\Http\Controllers\ReservationController@getFreeSlotsForReservationDate');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('/services', '\App\Http\Controllers\ServiceController')->only(['store', 'update', 'destroy']);
    Route::apiResource('/reservations', '\App\Http\Controllers\ReservationController')->only(['store', 'update', 'destroy']);
    Route::apiResource('/types', '\App\Http\Controllers\TypeController')->only(['store', 'update', 'destroy']);
    Route::get('/paginate', '\App\Http\Controllers\ReservationController@paginate');

    Route::post('/logout', '\App\Http\Controllers\LoginController@logout');
    Route::get('/user-reservations/{id}', '\App\Http\Controllers\ReservationController@getReservationsForUser');
    Route::get('/change-role/{id}', '\App\Http\Controllers\LoginController@changeRole');
});
