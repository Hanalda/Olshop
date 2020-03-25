<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Alamat;
use Auth;
class AlamatController extends Controller
{
    function __construct()
    {

    }

    public function getByUser($id)
    {
        return response([
            "alamat" => Alamat::where("id", $id)->get()
        ]);
    }

public function save(Request $request)
{
    $action = $request->action;
    if ($action == "insert"){
        try{
            $alamat = new Alamat();
            $alamat->id = $request->id;
            $alamat->nama_penerima = $request->nama_penerima;
            $alamat->kode_pos = $request->kode_pos;
            $alamat->kecamatan = $request->kecamatan;
            $alamat->kota = $request->kota;
            $alamat->jalan = $request->jalan;
            $alamat->rt = $request->rt;
            $alamat->rw = $request->rw;
            $alamat->save();

            return response(["message" => "Data Barang berhasil ditambahkan"]);
        }catch (\Exception $e){
            return response(["message" => $e->getMessage()]);
        }
    }else if($action == "update"){
        try{
            $alamat = Alamat::where("id_pengiriman", $request->id_pengiriman)->first();
            $alamat->id = $request->id;
            $alamat->nama_penerima = $request->nama_penerima;
            $alamat->kode_pos = $request->kode_pos;
            $alamat->kecamatan = $request->kecamatan;
            $alamat->kota = $request->kota;
            $alamat->jalan = $request->jalan;
            $alamat->rt = $request->rt;
            $alamat->rw = $request->rw;

            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->getClientOriginalName();
                $file->move(\base_path() ."/public/image", $name);
                $alamat->image = $name;
            }
            $alamat->save();
            
            return response(["message" => "Data Alamat berhasil diubah"]);
        }catch (\Exception $e){
            return response(["message" => $e->getMessage()]);
        }
    }
}

        public function drop($id_pengiriman)
        {
            try{
                Alamat::where("id_pengiriman",$id_pengiriman)->delete();
                return response(["message" => "Data berhasil dihapus"]);
            }catch (\Exception $e){
                return response(["message" => $e->getMessage()]);
            }
        }
    

    public function delete($id_pengiriman)
    {
        try{
            Alamat::where("id_pengiriman", $id_pengiriman)->delete();
            return response(["message" => "Data pengiriman berhasil dihapus"]);
        }catch (\Exception $e) {
            return response(["message" => $e->getMessage()]);
        }
    }
}
?>