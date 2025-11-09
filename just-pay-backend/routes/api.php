<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'check.token.expiration'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    Route::prefix('subscriptions')->group(function () {
        Route::get('current', [SubscriptionController::class, 'getCurrentSubscription']);
        Route::post('cancel', [SubscriptionController::class, 'cancelSubscription']);

        Route::post('checkout/{plan}', [SubscriptionController::class, 'createCheckoutSession']);
    });

    Route::prefix('plans')->group(function () {
        Route::get('/', [PlanController::class, 'index']);
    });
});

Route::post('webhook', [StripeWebhookController::class, 'handle']);
