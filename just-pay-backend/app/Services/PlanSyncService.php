<?php

namespace App\Services;

use App\Models\Plan;
use Illuminate\Support\Facades\Log;
use Stripe\Price;

class PlanSyncService
{
    public function syncProduct(array $product): int|null
    {
        try {
            $plan = Plan::updateOrCreate(
                ['stripe_product_id' => $product['id']],
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
}
