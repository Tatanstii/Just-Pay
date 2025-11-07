<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function register(array $data): User
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $user->createAsStripeCustomer();

            $user->newSubscription('default', env('STRIPE_FREE_PLAN_ID'))->create();

            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('User registration failed: ' . $e->getMessage());

            throw $e;
        }
    }
}
