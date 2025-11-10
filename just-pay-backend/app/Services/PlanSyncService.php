<?php

namespace App\Services;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Stripe\Price;
use Stripe\Subscription;

class PlanSyncService
{


    public function syncProduct(array $product): int|null
    {
        try {
            $plan = Plan::updateOrCreate(
                ['stripe_price_id' => env('STRIPE_FREE_PLAN_PRICE_ID')],
                ['name' => $product['name'], 'description' => $product['description']]
            );

            if ($product['default_price']) {
                $price = Price::retrieve($product['default_price']);
                $this->syncPrice($price->toArray());
            }
            return $plan?->id;
        } catch (\Throwable $th) {
            Log::error('PlanSyncService syncProduct error: ' . $th->getMessage());
            throw new \Exception("Failed to sync Product ID: {$product['id']}. Error: " . $th->getMessage());
        }
    }

    public function syncPrice(array $price): int|null
    {
        try {
            $plan = Plan::where('stripe_price_id', $price['id'])
                ->orWhere('stripe_product_id', $price['product'])
                ->first();

            if (!$plan) {
                throw new \Exception("Plan not found for Price ID: {$price['id']}");
            }

            $plan->update(
                [
                    'stripe_price_id' => $price['id'],
                    'amount' => $price['unit_amount'],
                    'currency' => $price['currency'],
                    'interval' => $price['recurring']['interval'],
                ]
            );

            return $plan?->id;
        } catch (\Throwable $th) {
            Log::error('PlanSyncService syncPrice error: ' . $th->getMessage());
            throw new \Exception("Failed to sync Price ID: {$price['id']}. Error: " . $th->getMessage());
        }
    }

    public function syncDeleteProduct(array $product): int|null
    {
        try {
            $plan = Plan::where('stripe_product_id', $product['id'])->first();
            if ($plan) {
                $plan->active = false;
                $plan->save();
            }
            return $plan?->id;
        } catch (\Throwable $th) {
            Log::error('PlanSyncService syncDeleteProduct error: ' . $th->getMessage());
            throw new \Exception("Failed to sync delete Product ID: {$product['id']}. Error: " . $th->getMessage());
        }
    }

    public function syncSubscription(array $subscription): int|null
    {
        try {
            $user = User::where('stripe_id', $subscription['customer'])->first();


            if (!$user) {
                throw new \Exception("User not found for Customer ID: {$subscription['customer']}");
            }

            $plan = Plan::where('stripe_price_id', $subscription['items']['data'][0]['price']['id'])->first();

            if (!$plan) {
                throw new \Exception("Plan not found for Price ID: {$subscription['items']['data'][0]['price']['id']}");
            }

            $newSubscriptionId = $subscription['id'];

            $existingSubs = Subscription::all([
                'customer' => $user->stripe_id,
                'status' => 'active',
                'limit' => 100,
            ]);

            foreach ($existingSubs->data as $sub) {
                if ($sub->id === $newSubscriptionId) {
                    continue;
                }

                try {
                    $remote = Subscription::retrieve($sub->id);
                    $remote->cancel();
                } catch (\Throwable $e) {
                    Log::error("PlanSyncService: error cancelando suscripción {$sub->id} para usuario {$user->id}: " . $e->getMessage());
                }
            }

            $user->update([
                'plan_id' => $plan->id
            ]);

            return $plan?->id;
        } catch (\Throwable $th) {
            Log::error('PlanSyncService syncSubscription error: ' . $th->getMessage());
            throw new \Exception("Failed to sync Subscription ID: {$subscription['id']}. Error: " . $th->getMessage());
        }
    }
}
