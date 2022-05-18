<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    
    public function counter(Request $request)
    {

        try {

            $totalDonated = 0;
            $currentActiveBalance = 0;
            $watchlistCount = 0;

            $responseData = [
                'total_donated' => $totalDonated,
                'current_active_balance' => $currentActiveBalance,
                'watchlist_count' => $watchlistCount,
            ];

            return $this->success($responseData);

        } catch (\Exception $e) {

            return $this->error($e->getMessage(), 500);

        }
        
    }

}
