<?php

namespace App\Http\Controllers;

use App\Services\PlanService;
use App\Traits\ApiResponseTrait;

class PlanController extends Controller
{
    use ApiResponseTrait;

    public function __construct(private PlanService $planService) {}

    public function index()
    {
        $plans = $this->planService->getAllPlans();
        return $this->successResponse($plans);
    }
}
