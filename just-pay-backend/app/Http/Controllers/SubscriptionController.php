<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use App\Services\SubscriptionService;

class SubscriptionController extends Controller
{
    use ApiResponseTrait;

    public function __construct(private SubscriptionService $subscriptionService) {}

    public function getCurrentSubscription(Request $request)
    {
        $user = $request->user();
        $subscriptionDTO = $this->subscriptionService->getCurrentSubscription($user);

        return $this->successResponse($subscriptionDTO);
    }

    public function cancelSubscription(Request $request)
    {
        $user = $request->user();

        try {
            $this->subscriptionService->cancelSubscription($user);

            return $this->successResponse(null, 'Subscription cancelled successfully.');
        } catch (\Throwable $th) {
            return $this->errorResponse('Failed to cancel subscription.', 500, $th->getMessage());
        }
    }
}
