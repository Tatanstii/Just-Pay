<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'stripe_product_id',
        'stripe_price_id',
        'amount',
        'currency',
        'interval',
        'features',
        'active',
        'is_free',
    ];

    protected $casts = [
        'features' => 'array',
        'amount' => 'integer',
        'active' => 'boolean',
        'is_free' => 'boolean',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
