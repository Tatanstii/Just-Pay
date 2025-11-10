<?php

namespace App\Http\Controllers;

use App\Models\Plan;
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

    public function createCheckoutSession(Request $request, Plan $plan)
    {
        $user = $request->user();
        $body = $request->all();

        $successUrl = $body['success_url'] ?? null;
        $cancelUrl = $body['cancel_url'] ?? null;

        if ($user->plan->id === $plan->id) {
            return $this->errorResponse('You are already subscribed to this plan.', 400);
        }

        if (!$successUrl && !env('FRONTEND_SUCCESS_URL')) {
            return $this->errorResponse('Success URL is required.', 400);
        }

        try {
            $checkoutUrl = $this->subscriptionService->createCheckoutSession($user, $plan, $successUrl, $cancelUrl);

            return $this->successResponse(['checkout_url' => $checkoutUrl]);
        } catch (\Throwable $th) {
            return $this->errorResponse('Failed to create checkout session.', 500, $th->getMessage());
        }
    }
}
