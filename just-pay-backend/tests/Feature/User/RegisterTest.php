<?php

use App\Services\StripeService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('registers a user successfully', function () {
    $stripe = Mockery::mock(StripeService::class);
    $stripe->shouldReceive('createCustomer')->once();
    $stripe->shouldReceive('subscribeToFreePlan')->once();

    $this->app->instance(StripeService::class, $stripe);

    $payload = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    $response = $this->postJson('/api/register', $payload);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'message',
            'data' => [
                'user' => ['id', 'name', 'email'],
                'access_token',
                'token_type',
            ]
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'john@example.com',
    ]);
});