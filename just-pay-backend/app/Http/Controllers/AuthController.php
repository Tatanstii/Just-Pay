<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use App\Traits\ApiResponseTrait;

class AuthController extends Controller
{
    use ApiResponseTrait;

    public function __construct(private AuthService $authService) {}

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $result = $this->authService->login($credentials);

        return $this->successResponse($result, 'User logged in successfully');
    }

    public function logout()
    {
        $this->authService->logout();
        return $this->successResponse([], 'User logged out successfully');
    }

    public function user()
    {
        $user = $this->authService->getAuthenticatedUser();
        return $this->successResponse(['user' => $user], 'Authenticated user retrieved successfully');
    }
}
