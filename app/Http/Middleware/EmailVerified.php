<?php

namespace App\Http\Middleware;

use Closure;
use Response;

use Illuminate\Http\Request;

class EmailVerified
{
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->email_verified_at){
            return $next($request);
        }else{
            $____notVerified = true;
            return response(
                view('auth.verification',
                    compact(
                        '____notVerified'
                    )
                )
            );
        }
    }
}
