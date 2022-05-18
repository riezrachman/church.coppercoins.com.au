<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use DB;

class Organization extends Model
{

    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ch_organizations';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'ch_user_id',
        'name',
        'phone',
        'address',
        'city',
        'postal_code',
        'country',
        'website_url',
        'business_phone',
    ];

    public function categories()
    {
        return $this->hasMany(OrganizationCategory::class, 'ch_organization_id', 'id');
    }

    public function bank()
    {
        return $this->hasOne(OrganizationBank::class, 'ch_organization_id', 'id');
    }

}
