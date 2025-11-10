<?php

namespace App\Http\Controllers;

use App\Models\StripeWebhookEvent;
use App\Services\PlanSyncService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

            // Evitamos procesar el mismo evento dos veces
            $existing = StripeWebhookEvent::where('stripe_event_id', $event->id)->first();
            if ($existing) {
                return $this->successResponse("Event already processed.", 200);
            }

            // Guardamos el evento en la base
            $webhookEvent = StripeWebhookEvent::create([
                'stripe_event_id' => $event->id,
                'type' => $event->type,
                'payload' => json_decode(json_encode($event->data->object), true),
                'status' => 'pending',
            ]);

            $data = $webhookEvent->payload;
            $planId = null;

            // Procesamos según el tipo de evento
            switch ($event->type) {
                case 'product.created':
                case 'product.updated':
                    $planId = $this->planSyncService->syncProduct($data);
                    break;

                case 'price.created':
                case 'price.updated':
                    $planId = $this->planSyncService->syncPrice($data);
                    break;

                case 'product.deleted':
                    $planId = $this->planSyncService->syncDeleteProduct($data);
                    break;

                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    $planId = $this->planSyncService->syncSubscription($data);
                    break;

                default:
                    Log::info("StripeWebhookController: Unhandled event type {$event->type}");
                    break;
            }

            // Marcamos el evento como procesado
            $webhookEvent->update([
                'status' => 'processed',
                'processed_at' => now(),
            ]);

            return $this->successResponse("Event processed successfully. Plan ID: {$planId}", 200);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error("StripeWebhookController: Signature verification failed: {$e->getMessage()}");
            return $this->errorResponse("Event signature verification failed", 400, $e->getMessage());
        } catch (\Throwable $e) {
            Log::error("StripeWebhookController: Webhook handling error: {$e->getMessage()}");
            return $this->errorResponse("Webhook handling error", 500, $e->getMessage());
        }
    }
}
