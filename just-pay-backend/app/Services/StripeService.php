<?php

namespace App\Services;

use App\Models\User;

class StripeService
{
    public function createCustomer(User $user)
    {
        return $user->createAsStripeCustomer();
    }

    public function subscribeToFreePlan(User $user)
    {
        return $user->newSubscription('default', env('STRIPE_FREE_PLAN_ID'))
            ->create();
    }
}
