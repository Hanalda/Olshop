<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class detail_Order extends Model
{
    protected $table = "detail_order";
    protected $fillable = ["id_order","id_produk","quantity"];

    public function order()
    {
        return $this->belongsTo("App\Order","id_order","id");
    }

    public function produk()
    {
        return $this->belongsTo("App\Produk","id_produk","id_produk");
    }
}