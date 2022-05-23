<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{

    use HasFactory;

    /**
     * The database connection that should be used by the model.
     *
     * @var string
     */
    protected $connection = 'mysql_bank';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tr_transactions';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['basiq', 'account'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function basiq()
    {
        return $this->belongsTo(UserBank::class);
    }

    public function account()
    {
        return $this->belongsTo(UserBankAccount::class);
    }

}
