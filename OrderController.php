<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Order;
use App\detail_Order;
use App\Profil;
use App\Alamat;
use App\Produk;
use App\User;
use Auth;

class OrderController extends Controller
{
    function __construct()
    {


    }

    public function get()
    {
        $order = [];
        foreach (Order::all() as $o) {
            $detail = [];
            foreach ($o->detail_order as $d) {
            $itemDetail = [
            "id_order" => $d->id_order,
            "id_produk" => $d->id_produk,
            "nama_produk" => $d->produk->nama_produk,
            "quantity" => $d->quantity
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id_order,
        "id" => $o->id,
        "nama" => $o->user->nama,
        "id_pengiriman" => $o->id_pengiriman,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "detail" => $detail
      ];
       array_push($order,$item);
    }
    return response(["order" => $order]);

    }

    public function accept($id_order)
  {
    $o = Order::where("id_order", $id_order)->first();
    $o->status = "dikirim";
    $o->save();
  }

  public function decline($id_order)
  {
    $o = Order::where("id_order", $id_order)->first();
    $o->status = "ditolak";
    $o->save();
  }

}
