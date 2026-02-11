<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\EmailVerificationRequest;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): mixed
    {
        if ($request->user()->hasVerifiedEmail()) {
            return view('email.verified');
           
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

         return view('email.verified');
    }
}