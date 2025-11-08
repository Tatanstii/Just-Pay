<?php

namespace App\Services;

use App\Models\Plan;

class PlanService
{
    public function getAllPlans()
    {
        $plans = Plan::paginate(10);
        return  $plans;
    }
}
