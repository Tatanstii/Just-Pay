<?php

namespace App\Http\Controllers;

use App\Services\PlanSyncService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{

    use ApiResponseTrait;

    public function __construct(private PlanSyncService $planSyncService)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');


        try {
            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                $endpointSecret
            );

            $type = $event->type;
            $data = json_decode(json_encode($event->data->object), true);

            $planId = match ($type) {
                'product.updated', 'product.created' => $this->planSyncService->syncProduct($data),
                'price.updated', 'price.created' => $this->planSyncService->syncPrice($data),
                'product.deleted' => $this->planSyncService->syncDeleteProduct($data),
                default => response()->json(['message' => 'Event type not handled']),
            };

            return $this->successResponse("Plan has been synced. Plan ID: {$planId}", 200);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return $this->errorResponse("Event signature verification failed", 400, $e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse("Webhook handling error", 500, $e->getMessage());
        }
    }
}
