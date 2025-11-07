<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function __construct(private StripeService $stripeService) {}

    public function register(array $data): User
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $this->stripeService->createCustomer($user);

            $this->stripeService->subscribeToFreePlan($user);

            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('User registration failed: ' . $e->getMessage());

            throw $e;
        }
    }
}
