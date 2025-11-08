<?php

namespace App\Services;

use App\Models\User;

class StripeService
{
    public function createCustomer(User $user)
    {
        return $user->createAsStripeCustomer();
    }
}
