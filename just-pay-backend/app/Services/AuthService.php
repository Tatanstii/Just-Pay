<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function login(array $credentials): array
    {
        $user = $this->validateCredentials(
            $credentials['email'],
            $credentials['password']
        );

        $token = $this->createTokenForUser($user);

        return ['user' => $user, 'access_token' => $token];
    }

    public function logout(): void
    {
        $this->deleteCurrentUserToken();
    }

    public function validateCredentials(string $email, string $password): User
    {

        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $user;
    }

    public function createTokenForUser(User $user): string
    {
        $this->deleteUserTokens($user);
        return $user->createToken('auth_token')->plainTextToken;
    }

    public function deleteUserTokens(User $user): void
    {
        $user->tokens()->delete();
    }

    public function deleteCurrentUserToken(): void
    {
        $user = Auth::user();

        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }
    }

    public function getAuthenticatedUser(): User
    {
        return Auth::user();
    }
}
