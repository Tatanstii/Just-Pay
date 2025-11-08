<?php

namespace App\Services;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class StripeService
{
    public function syncPlans()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $products = Product::all();

        if (!$products || count($products->data) === 0) {
            Plan::create([
                'name' => 'Free Plan',
                'description' => 'You only have one free plan.',
                'stripe_product_id' => null,
                'stripe_price_id' => env('STRIPE_FREE_PLAN_PRICE_ID'),
                'amount' => 0,
                'currency' => 'usd',
                'interval' => 'month',
            ]);
        }

        foreach ($products as $product) {
            $prices = Price::all(['product' => $product->id]);
            $price = $prices->data[0] ?? null;

            $existingPlan = Plan::where('stripe_product_id', $product->id)->first();

            if (!$existingPlan) {
                Plan::create([
                    'name' => $product->name,
                    'description' => $product->description,
                    'stripe_product_id' => $product->id,
                    'stripe_price_id' => $price->id ?? null,
                    'amount' => $price->unit_amount ?? null,
                    'currency' => $price->currency ?? null,
                    'interval' => $price->recurring['interval'] ?? null,
                ]);
            } else {
                $existingPlan->update([
                    'name' => $product->name,
                    'description' => $product->description,
                    'stripe_product_id' => $product->id,
                    'stripe_price_id' => $price->id ?? null,
                    'amount' => $price->unit_amount ?? null,
                    'currency' => $price->currency ?? null,
                    'interval' => $price->recurring['interval'] ?? null,
                ]);
            }
        }
    }

    public function createCustomer(User $user)
    {
        return $user->createAsStripeCustomer();
    }
}
