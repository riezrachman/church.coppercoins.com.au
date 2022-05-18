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

    public function index()
    {

        if (auth()->user()) {
            return redirect(url('dashboard'));
        } else {
            return view('auth.' . Route::currentRouteName());
        }

    }
    
    public function signUp(Request $request)
    {

        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:5|max:255',
                'email' => 'required|email|min:5|max:255|unique:ch_users,email',
                'password' => 'required|string|min:6|max:255',
                'phone' => 'required|numeric',
                'position_name' => 'required|string|max:255',
                'organization.name' => 'required|string|min:5|max:255',
                'organization.phone' => 'required|numeric',
                'organization.address' => 'required|string|min:5|max:255',
                'organization.city' => 'required|string|min:5|max:255',
                'organization.postal_code' => 'required|numeric',
                'organization.country' => 'required|string|min:5|max:255',
                'organization.website_url' => 'required|string|min:5|max:255',
                'organization.business_phone' => 'required|numeric',
                'category_id' => 'required|integer|exists:ch_categories,id',
                'bank.ms_institution_id' => 'required',
                'bank.account_name' => 'required|string|min:5|max:255',
                'bank.account_number' => 'required|string|min:5|max:255',
                'bank.account_bsb' => 'required|string|min:5|max:255',
            ]);

            if($validator->fails()){

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $userData = $request->only('name', 'email', 'phone', 'position_name');
            $userData['password'] = Hash::make($request->password);
            $userData['email_verification_code'] = rand(100000, 999999);
            $userData['role_name'] = 'User';
            $userData['is_active'] = 1;
            $user = User::create($userData);

            $organizationData = $request->only('organization')['organization'];
            $organizationData['ch_user_id'] = $user->id;
            $organization = Organization::create($organizationData);

            $organizationCategoryData = $request->only('category_id');
            $organizationCategoryData['ch_organization_id'] = $organization->id;
            $organizationCategoryData['ch_category_id'] = $request->category_id;
            $organizationCategory = OrganizationCategory::create($organizationCategoryData);

            $organizationBankData = $request->only('bank')['bank'];
            $organizationBankData['ch_organization_id'] = $organization->id;
            $organizationBank = OrganizationBank::create($organizationBankData);

            Mail::to($request->email)->send(new VerificationMail($user));

            if(!Auth::attempt($request->only('email', 'password'))){

                return $this->error('Credentials not match', 401);

            }

            if(auth()->user()->is_active == 0){

                return $this->error('Your account is disabled, please contact Admin for more information', 400);

            }

            $responseData = [
                'user'  => auth()->user(),
                'token' => auth()->user()->createToken('Charity: API Token')->plainTextToken,
            ];

            DB::commit();

            return $this->success($responseData);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }

    public function signIn(Request $request)
    {

        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|exists:ch_users,email',
                'password' => 'required|string|min:6',
            ]);

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
                'token' => auth()->user()->createToken('Charity: API Token')->plainTextToken,
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

        if (auth()->user()) {

            auth()->user()->tokens()->delete();
            Auth::logout();
            
        }

        return $this->success([]);

    }

    public function checkUser(Request $request)
    {

        try {

            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|exists:ch_users,email',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $user = User::where('email', $request->email)->first();

            return $this->success($user);

        } catch (\Exception $e) {

            return $this->error($e->getMessage(), 500);

        }

    }

    public function confirmEmail(Request $request)
    {

        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'code' => 'required|string|min:6|max:6',
                'token' => 'required|string|min:6|max:255',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $user = User::where(DB::raw('md5(email)'), $request->token)->where('email_verification_code', $request->code)->first();

            if (is_null($user)) {

                return $this->error('Your code is already used.', 404);

            }

            $userData = [
                'email_verification_code' => null,
                'email_verified_at' => Carbon::now()
            ];

            $user->update($userData);

            DB::commit();

            return $this->success([]);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }

    public function profile(Request $request)
    {

        try {

            $user = auth()->user();

            $user->organization = Organization::where('ch_user_id', $user->id)->first();

            $organizationId = $user->organization->id;

            $user->organization['categories'] = OrganizationCategory::select(
                'ch_organization_category.id',
                'ch_organization_category.ch_category_id',
                DB::raw('(select name from ch_categories where id = ch_organization_category.ch_category_id) as ch_category_name'),
            )
            ->where('ch_organization_category.ch_organization_id', $organizationId)
            ->get();

            $user->organization['bank'] = OrganizationBank::select(
                'ch_organization_bank.id',
                'ch_organization_bank.account_name',
                'ch_organization_bank.account_number',
                'ch_organization_bank.account_bsb',
                'ch_organization_bank.ms_institution_id',
            )
            ->where('ch_organization_bank.ch_organization_id', $organizationId)
            ->first();

            if (isset($user->organization['bank'])) {

                $user->organization['bank']['ms_institution'] = BankInstitution::select(
                    'ms_institutions.full_name',
                    'ms_institutions.short_name',
                    'ms_institutions.type',
                    'ms_institutions.country',
                    'ms_institutions.logo_square',
                    'ms_institutions.logo_full',
                )
                ->where('ms_institutions.id', $user->organization['bank']->ms_institution_id)
                ->first();

            }

            return $this->success($user);

        } catch (\Exception $e) {

            return $this->error($e->getMessage(), 500);

        }
        
    }

}
