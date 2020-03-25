<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

 class Order extends Model{
     protected $table = "order";
     protected $primaryKey = "id_order";
     protected $fillable = ["id_order","id","id_pengiriman","total","bukti_bayar","status"];

     public function user()
     {
         return $this->belongsTo("App\user","id","id");

     }
     public function alamat()
     {
         return $this->belongsTo("App\alamat","id","id_pengiriman");
     }
     public function detail_order()
     {
         return $this->hasMany("App\detail_Order","id_order");
     }
 }