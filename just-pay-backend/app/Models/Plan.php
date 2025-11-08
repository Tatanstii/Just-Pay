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
    ];

    protected $casts = [
        'features' => 'array',
        'amount' => 'integer',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
