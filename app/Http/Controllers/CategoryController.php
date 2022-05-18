<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use App\Models\OrganizationCategory;

use DB;
use Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        try {

            $data = Category::select(
                'ch_categories.id',
                'ch_categories.name',
                'ch_categories.created_at',
                'ch_categories.updated_at',
            )
            ->when($request, function ($query) use ($request) {
                // TODO
            })
            ->get();

            return $this->success($data);

        } catch (\Exception $e) {

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
                'name' => 'required|string|min:5|max:255',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $categoryData = $request->all();

            $category = Category::create($categoryData);

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
    public function show($id)
    {
        
        try {

            $category = Category::select(
                'ch_categories.id',
                'ch_categories.name',
                'ch_categories.created_at',
                'ch_categories.updated_at',
            )
            ->where('ch_categories.id', $id)
            ->first();

            if (is_null($category)) {

                return $this->error('Category not found...', 404);

            }

            return $this->success($category);

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
                'name' => 'filled|string|min:5|max:255',
            ]);

            if ($validator->fails()) {

                return $this->error($validator->errors()->first(), 400, $validator->errors());

            }

            $category = Category::find($id);

            if (is_null($category)) {

                return $this->error('Category not found...', 404);

            }

            $categoryData = $request->all();

            $category->update($categoryData);

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

            $category = Category::find($id);

            if (is_null($category)) {

                return $this->error('Category not found...', 404);

            }

            $category->delete();

            DB::commit();

            return $this->success($category);

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->error($e->getMessage(), 500);

        }

    }
}
