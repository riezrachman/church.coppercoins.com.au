<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Organization;
use App\Models\OrganizationCategory;

use DB;
use Validator;

class OrganizationController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Store a newly created resource in storage as user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateOrCreateAsUser(Request $request)
    {
        
        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'name' => 'filled|string|min:5|max:255',
                'phone' => 'filled|numeric',
                'address' => 'filled|string|min:5|max:255',
                'city' => 'filled|string|min:5|max:255',
                'postal_code' => 'filled|numeric',
                'country' => 'filled|string|min:5|max:255',
                'website_url' => 'filled|string|min:5|max:255',
                'business_phone' => 'filled|numeric',
                'category_id' => 'filled|integer|exists:ch_categories,id',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $organizationWhere = [
                'ch_user_id' => auth()->user()->id,
            ];

            $organizationData = $request->except('category_id');

            $organization = Organization::updateOrCreate($organizationWhere, $organizationData);

            $organizationCategoryWhere = [
                'ch_organization_id' => $organization->id,
            ];

            $organizationCategoryData = [
                'ch_category_id' => $request->category_id,
            ];

            $organizationCategory = OrganizationCategory::updateOrCreate($organizationCategoryWhere, $organizationCategoryData);

            DB::commit();

            return $this->success($organization);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }

}
