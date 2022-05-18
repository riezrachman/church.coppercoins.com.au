<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BankInstitution extends Model
{
    use HasFactory;

    protected $connection = 'mysql_bank';

    protected $table = 'ms_institutions';

    public $incrementing = false;

    protected $fillable = [
        'full_name',
        'short_name',
        'type',
        'country',
        'logo_square',
        'logo_full',
        'mod_ip',
        'mod_time',
        'sorter',
        'status',
    ];
}
