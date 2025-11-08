<?php

namespace Database\Seeders;

use App\Services\StripeService;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        (new StripeService)->syncPlans();
    }
}
