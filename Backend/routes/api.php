<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateursController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NiveauxController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::delete('/utilisateurs/{utilisateur}', [UtilisateursController::class, 'destroy']);
Route::apiResource('niveaux', NiveauxController::class);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UtilisateursController::class, 'me']); // Utilise le contrôleur UtilisateursController
    Route::get('/utilisateurs', [UtilisateursController::class, 'index']);
    Route::post('/utilisateurs', [UtilisateursController::class, 'store']);
    Route::post('/logout', [AuthController::class, 'logout']);

  
});
