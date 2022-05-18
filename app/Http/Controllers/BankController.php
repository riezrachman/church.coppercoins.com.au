<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\BankInstitution;

class BankController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        try {

            $data = BankInstitution::select('*')
            ->when($request, function ($query) use ($request) {
                // TODO
            })
            ->get();

            return $this->success($data);

        } catch (\Exception $e) {

            return $this->error($e->getMessage(), 500);

        }

    }

}
