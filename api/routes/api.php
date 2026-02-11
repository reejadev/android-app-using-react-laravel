<?php

use App\Enums\OperationEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;


Route::middleware('guest')->group( function (): void {
    Route::post('/signup', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('signup');

    Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');
   
}); 



Route::get('/operations/credits', function()
     {return response()->json(['operations'=> OperationEnum::listOfCredits(),

]);
});

       Route::post('/images/fill', [ImageController::class, 'fill']);


Route::middleware(['auth:sanctum'])
->group( function (): void {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
       ->name('logout');


Route::get('/user', function (Request $request) {
        return $request->user();
});
Route::get('/image/latest-operations', [ImageController::class, 'getLatestOperations']);
Route::get('/image/operation/{id}', [ImageController::class, 'getOperation'] );
Route::delete('/image/operation/{id}', [ImageController::class, 'deleteOperation'] );


});



   