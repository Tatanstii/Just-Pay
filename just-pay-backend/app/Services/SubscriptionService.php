<?php

namespace App\Services;

use App\DTO\SubscriptionDTO;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{
    public function getCurrentSubscription(User $user)
    {
        try {
            $subscription = $user->subscription('default');

            Log::info('subscripcion: ' . json_encode($subscription));

            if (!$subscription) {
                return null;
            }

            return new SubscriptionDTO(
                $subscription->stripe_status,
                $subscription->created_at->toDateTimeString(),
                $user->plan,
                $subscription->current_period_end ? $subscription->current_period_end->timestamp : null
            );
        } catch (\Throwable $th) {
            Log::error('Error al obtener la suscripción actual: ' . $th->getMessage());
            throw $th;
        }
    }

    public function subscribeToFreePlan(User $user)
    {
        try {

            if ($user->subscribed('default')) {
                return;
            }

            $plan = Plan::where('stripe_price_id', env('STRIPE_FREE_PLAN_PRICE_ID'))->firstOrFail();

            $user->newSubscription('default', $plan->stripe_price_id)->create();
            $user->update(['plan_id' => $plan->id]);
        } catch (\Throwable $th) {
            Log::error('Error al suscribir al plan gratuito: ' . $th->getMessage());
            throw $th;
        }
    }

    public function cancelSubscription(User $user)
    {
        try {
            $subscription = $user->subscription('default');

            if (!$subscription->active()) {
                throw new \Exception('La suscripción no está activa.');
            }

            if ($user->plan->stripe_price_id == env('STRIPE_FREE_PLAN_PRICE_ID')) {
                throw new \Exception('No se puede cancelar la suscripción al plan gratuito.');
            }

            if ($subscription) {
                $subscription->cancel();
            }
        } catch (\Throwable $th) {
            Log::error('Error al cancelar la suscripción: ' . $th->getMessage());
            throw $th;
        }
    }
}
