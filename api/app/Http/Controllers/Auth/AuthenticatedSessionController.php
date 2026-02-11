<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
     public function store(LoginRequest $request): JsonResponse
    {
       
try {
        $request->authenticate();
        $user = $request->user();
        // $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
} catch (\Illuminate\Validation\ValidationException $e) {
  return response()->json([
            'message' => 'Invalid credentials',
            'errors' => [
                'email'=>$e->getMessage()],
        ], 422);            
     
    }
    }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }   

        return response()->json([
            'message' => 'Logged out successfully',
        ]); 
    }
}