<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\BankInstitution;
use App\Models\Category;
use App\Models\Organization;
use App\Models\OrganizationBank;
use App\Models\OrganizationCategory;
use App\Models\User;

use App\Mail\VerificationMail;

use Auth;
use Carbon\Carbon;
use DB;
use Hash;
use Mail;
use Validator;

class AuthController extends Controller
{

    public function signIn(Request $request)
    {

        try {

            DB::beginTransaction();

            $validationRules = [
                'email' => 'required|string|email|exists:users,email',
                'password' => 'required|string|min:6|max:255',
            ];

            $validationMessages = [
                'email.required' => 'E-mail address is required and should not be empty.',
                'email.email' => 'You have entered an invalid e-mail address. Please try again.',
                'email.exists' => 'E-mail address you have entered does not exists.',
                'password.required' => 'Password is required and should not be empty.',
                'password.min' => 'Password must be at least 6 characters.',
                'password.max' => 'Password must not be more than 255 characters.',
            ];

            $validator = Validator::make($request->all(), $validationRules, $validationMessages);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            if (!Auth::attempt($request->all())) {

                return $this->error('Credentials not match', 401);

            }

            if (auth()->user()->is_active == 0) {

                return $this->error('Your account is disabled, please contact Admin for more information', 400);

            }

            $responseData = [
                'user' => auth()->user(),
                'token' => auth()->user()->createToken("Login")->plainTextToken,
            ];

            DB::commit();

            return $this->success($responseData);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }

    public function signOut(Request $request)
    {

        Auth::logout();
        
        if (auth()->check()) {

            auth()->user()->tokens()->delete();

        }

        return $this->success(null);

    }

}
