<?php

namespace App\Services;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class PlanSyncService
{
    public function syncProduct(array $product): ?int
    {
        try {
            $plan = Plan::updateOrCreate(
                ['stripe_product_id' => $product['id']],
                ['name' => $product['name'], 'description' => $product['description'], 'active' => true]
            );

            // Si tiene precio por defecto, sincronizarlo
            if (!empty($product['default_price'])) {
                $this->syncPrice(['id' => $product['default_price'], 'product' => $product['id']]);
            }

            return $plan->id;
        } catch (\Throwable $th) {
            Log::error("PlanSyncService syncProduct error: {$th->getMessage()}");
            return null;
        }
    }

    public function syncPrice(array $price): ?int
    {
        try {
            $plan = Plan::where('stripe_price_id', $price['id'])
                ->orWhere('stripe_product_id', $price['product'])
                ->first();

            if (!$plan) throw new \Exception("Plan not found for Price ID {$price['id']}");

            $plan->update([
                'stripe_price_id' => $price['id'],
                'amount' => $price['unit_amount'] ?? $plan->amount,
                'currency' => $price['currency'] ?? $plan->currency,
                'interval' => $price['recurring']['interval'] ?? $plan->interval,
                'active' => true,
            ]);

            return $plan->id;
        } catch (\Throwable $th) {
            Log::error("PlanSyncService syncPrice error: {$th->getMessage()}");
            return null;
        }
    }

    public function syncDeleteProduct(array $product): ?int
    {
        try {
            $plan = Plan::where('stripe_product_id', $product['id'])->first();
            if ($plan) {
                $plan->update(['active' => false]);
            }
            return $plan?->id;
        } catch (\Throwable $th) {
            Log::error("PlanSyncService syncDeleteProduct error: {$th->getMessage()}");
            return null;
        }
    }

    public function syncSubscription(array $subscription): ?int
    {
        try {
            $user = User::where('stripe_id', $subscription['customer'])->first();
            if (!$user) throw new \Exception("User not found for Customer ID {$subscription['customer']}");

            $priceId = $subscription['items']['data'][0]['price']['id'] ?? null;
            if (!$priceId) throw new \Exception("Subscription has no price ID");

            $plan = Plan::where('stripe_price_id', $priceId)->first();
            if (!$plan) throw new \Exception("Plan not found for Price ID {$priceId}");

            $user->update(['plan_id' => $plan->id]);

            return $plan->id;
        } catch (\Throwable $th) {
            Log::error("PlanSyncService syncSubscription error: {$th->getMessage()}");
            return null;
        }
    }
}
