<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\RegisterRequest;
use App\Services\AuthService;
use App\Services\UserService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponseTrait;

    public function __construct(private UserService $userService, private AuthService $authService) {}

    public function register(RegisterRequest $request)
    {
        $user = $this->userService->register($request->validated());
        $token = $this->authService->createTokenForUser($user);

        return $this->successResponse([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 'User registered successfully', 201);
    }

    public function profile(Request $request)
    {
        return $this->successResponse($request->user(), 'User profile retrieved successfully');
    }
}
