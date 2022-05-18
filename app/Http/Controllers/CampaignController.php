<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Campaign;
use App\Models\Organization;

use DB;
use Storage;
use Validator;

class CampaignController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try{

            $data = Campaign::select(
                'ch_campaigns.id',
                'ch_campaigns.ch_organization_id',
                'ch_organizations.name as ch_organization_name',
                'ch_campaigns.name',
                'ch_campaigns.status',
                'ch_campaigns.introduction',
                'ch_campaigns.campaign_content',
                'ch_campaigns.donation_content',
                'ch_campaigns.logo_image',
                'ch_campaigns.banner_image',
                'ch_campaigns.created_at',
                'ch_campaigns.updated_at',
                'ch_categories.name AS ch_categories_name'
            )
            ->leftJoin('ch_organizations', 'ch_organizations.id', 'ch_campaigns.ch_organization_id')
            ->leftJoin('ch_organization_category', 'ch_organization_category.ch_organization_id', 'ch_organizations.id')
            ->leftJoin('ch_categories', 'ch_categories.id', 'ch_organization_category.ch_category_id')
            ->where('ch_campaigns.status', '1')
            ->orderBy('ch_campaigns.id', 'DESC')
            ->paginate(15);

            return $this->success($data);

        }catch(\Exception $e){

            return $this->error($e->getMessage(), 500);

        }
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
        
        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'ch_organization_id' => 'required|integer|exists:ch_organizations,id',
                'name' => 'required|string|min:5|max:100',
                'introduction' => 'required|string|min:5|max:500',
                'campaign_content' => 'required|string|min:5|max:5000',
                'donation_content' => 'required|string|min:5|max:5000',
                'logo_image' => 'required|image|max:2048',
                'banner_image' => 'required|image|max:2048',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $campaignData = $request->all();

            if ($request->hasFile('logo_image')) {

                $path = Storage::put('campaign/logo', $request->file('logo_image'));

                $url = url('/storage') . '/' . $path;

                $campaignData['logo_image'] = $url;

            }

            if ($request->hasFile('banner_image')) {

                $path = Storage::put('campaign/banner', $request->file('banner_image'));

                $url = url('/storage') . '/' . $path;

                $campaignData['banner_image'] = $url;

            }

            $campaign = Campaign::create($campaignData);

            DB::commit();

            return $this->success($category);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        
        try {

            $campaign = Campaign::select(
                'ch_campaigns.id',
                'ch_campaigns.ch_organization_id',
                'ch_organizations.name as ch_organization_name',
                'ch_campaigns.status',
                'ch_campaigns.name',
                'ch_campaigns.introduction',
                'ch_campaigns.campaign_content',
                'ch_campaigns.donation_content',
                'ch_campaigns.logo_image',
                'ch_campaigns.banner_image',
                'ch_campaigns.created_at',
                'ch_campaigns.updated_at',
                'ch_categories.name AS ch_categories_name'
            )
            ->leftJoin('ch_organizations', 'ch_organizations.id', 'ch_campaigns.ch_organization_id')
            ->leftJoin('ch_organization_category', 'ch_organization_category.ch_organization_id', 'ch_organizations.id')
            ->leftJoin('ch_categories', 'ch_categories.id', 'ch_organization_category.ch_category_id')
            ->when($request, function ($query) use ($request, $id) {
                if ($id == 0) $query->where('ch_organizations.ch_user_id', auth()->user()->id);
                else $query->where('ch_campaigns.id', $id);
            })
            ->first();

            if (is_null($campaign)) {

                return $this->error('Campaign not found...', 404);

            }

            return $this->success($campaign);

        } catch (\Exception $e) {

            return $this->error($e->getMessage(), 500);

        }

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
        
        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'ch_organization_id' => 'filled|integer|exists:ch_organizations,id',
                'name' => 'filled|string|min:5|max:100',
                'introduction' => 'filled|string|min:5|max:500',
                'campaign_content' => 'filled|string|min:5|max:5000',
                'donation_content' => 'filled|string|min:5|max:5000',
                'logo_image' => 'filled|image|max:2048',
                'banner_image' => 'filled|image|max:2048',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $campaign = Campaign::find($id);

            if (is_null($campaign)) {

                return $this->error('Campaign not found...', 404);

            }

            $campaignData = $request->all();

            if ($request->hasFile('logo_image')) {

                $path = Storage::put('campaign/logo', $request->file('logo_image'));

                $url = url('/storage') . '/' . $path;

                $campaignData['logo_image'] = $url;

            }

            if ($request->hasFile('banner_image')) {

                $path = Storage::put('campaign/banner', $request->file('banner_image'));

                $url = url('/storage') . '/' . $path;

                $campaignData['banner_image'] = $url;

            }

            $campaign->update($campaignData);

            DB::commit();

            return $this->success($category);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        try {

            DB::beginTransaction();

            $campaign = Campaign::find($id);

            if (is_null($campaign)) {

                return $this->error('Campaign not found...', 404);

            }

            $campaign->delete();

            DB::commit();

            return $this->success($category);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

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
                'name' => 'filled|string|min:5|max:100',
                'introduction' => 'filled|string|min:5|max:500',
                'campaign_content' => 'filled|string|min:5|max:5000',
                'donation_content' => 'filled|string|min:5|max:5000',
                'logo_image' => 'filled|image|max:2048',
                'banner_image' => 'filled|image|max:2048',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $organization = Organization::where('ch_user_id', auth()->user()->id)->first();

            $campaignWhere = [
                'ch_organization_id' => $organization->id,
            ];

            $campaignData = $request->all();

            if ($request->hasFile('logo_image')) {

                $path = Storage::put('public/campaign/logo', $request->file('logo_image'));

                $url = url('/storage') . '/' . str_replace('public/', '', $path);

                $campaignData['logo_image'] = $url;

            }

            if ($request->hasFile('banner_image')) {

                $path = Storage::put('public/campaign/banner', $request->file('banner_image'));

                $url = url('/storage') . '/' . str_replace('public/', '', $path);

                $campaignData['banner_image'] = $url;

            }

            $campaign = Campaign::updateOrCreate($campaignWhere, $campaignData);

            DB::commit();

            return $this->success($campaign);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }
    
}
