<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Services\AuspostService;

use DB;

class Cart extends Model
{

    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'carts';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['user', 'user_address'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['stores', 'shipment_price', 'grandtotal'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'user_address_id',
        'notes',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'user_id',
        'user_address_id',
        'deleted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function user_address()
    {
        return $this->belongsTo(UserAddress::class);
    }

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function shipments()
    {
        return $this->hasMany(CartShipment::class);
    }

    public function getStoresAttribute()
    {

        $items = DB::table('cart_item')
        ->select(
            'products.store_id as id', 
            DB::raw('count(products.store_id) as item_count')
        )
        ->leftJoin('carts', 'carts.id', 'cart_item.cart_id')
        ->leftJoin('products', 'products.id', 'cart_item.product_id')
        ->where('carts.id', $this->id)
        ->whereNull('cart_item.deleted_at')
        ->groupBy('products.store_id')
        ->get();

        foreach ($items as &$d) {

            $d->attribute = Store::find($d->id);
            $d->shipment = $this->shipments()->where('store_id', $d->id)->first();

            $query = $this->items()->select('cart_item.*')
            ->leftJoin('products', 'products.id', 'cart_item.product_id')
            ->leftJoin('product_variant', 'product_variant.id', 'cart_item.product_variant_id')
            ->where('cart_item.cart_id', $this->id)
            ->where('products.store_id', $d->id);

            $d->items = $query->get();
            $d->total = (float) $query->sum(DB::raw('product_variant.price * cart_item.qty'));

            $auspost = new AuspostService();
            $d->shipment_options = $auspost->rates($d->items);
            
            $d->grandtotal = (float) $d->total + (is_null($d->shipment) ? 0 : $d->shipment->price);
            
        }

        return $items;

    }

    public function getGrandTotalAttribute()
    {
        return (float) CartItem::leftJoin('product_variant', 'product_variant.id', 'cart_item.product_variant_id')->where('cart_item.cart_id', $this->id)->sum(DB::raw('(product_variant.price * cart_item.qty)')) + $this->shipments()->sum('price');
    }

    public function getShipmentPriceAttribute()
    {
        return (float) $this->shipments()->sum('price');
    }

}
