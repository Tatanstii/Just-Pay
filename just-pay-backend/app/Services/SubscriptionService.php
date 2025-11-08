<?php

namespace App\Services;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{
    public function subscribeToFreePlan(User $user)
    {
        try {

            if ($user->subscribed('default')) {
                return;
            }

            $plan = Plan::where('stripe_price_id', env('STRIPE_FREE_PLAN_ID'))->firstOrFail();

            $user->newSubscription('default', $plan->stripe_price_id)->create();
            $user->update(['plan_id' => $plan->id]);
        } catch (\Throwable $th) {
            Log::error('Error al suscribir al plan gratuito: ' . $th->getMessage());
            throw $th;
        }
    }
}
