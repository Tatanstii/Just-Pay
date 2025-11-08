<?php

namespace App\DTO;

use App\Models\Plan;

class SubscriptionDTO
{
    public string $status;
    public Plan $plan;
    public string $started_at;
    public ?int $current_period_end;

    public function __construct(string $status, string $started_at,  Plan $plan, ?int $current_period_end)
    {
        $this->status = $status;
        $this->plan = $plan;
        $this->started_at = $started_at;
        $this->current_period_end = $current_period_end;
    }
}
