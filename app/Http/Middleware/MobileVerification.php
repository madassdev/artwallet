<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Inertia\Middleware;

class MobileVerification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $redirectToRoute
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|null
     */
    public function handle($request, Closure $next, $redirectToRoute = null)
    {
        if (
            !$request->user() ||
            !$request->user()->email_verified_at
        ) {
            return $request->expectsJson()
                ? abort(403, 'Your email address is not verified.')
                : Redirect::guest(URL::route($redirectToRoute ?: 'otp.request'));
        }

        return $next($request);
    }
}
