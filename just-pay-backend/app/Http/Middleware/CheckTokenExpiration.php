<?php

namespace App\Http\Middleware;

use App\Services\AuthService;
use App\Traits\ApiResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTokenExpiration
{
    use ApiResponseTrait;

    public function __construct(private AuthService $authService) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->authService->checkIsTokenExpired()) {
            $this->authService->deleteCurrentUserToken();
            return $this->errorResponse('Your session has expired. Please log in again.', 401);
        }

        return $next($request);
    }
}
