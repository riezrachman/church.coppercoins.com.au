<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartItem extends Model
{

    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cart_item';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['product', 'product_variant'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['total'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'cart_id',
        'product_id',
        'product_variant_id',
        'qty',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'cart_id',
        'product_id',
        'product_variant_id',
        'deleted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total' => 'double',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function product_variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function getTotalAttribute()
    {
        return (float) $this->qty * $this->product_variant->price;
    }

}
