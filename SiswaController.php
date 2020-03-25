<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Siswa;
use Auth;
class SiswaController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    return response([
      "siswa" => Siswa::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $siswa = Siswa::where("nis","like","%$find%")->orWhere("nama_siswa","like","%$find%")
    ->orWhere("kelas","like","%$find%")->get();
    return response([
      "siswa" => $siswa
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $siswa = new Siswa();
        $siswa->nis = $request->nis;
        $siswa->nama_siswa = $request->nama_siswa;
        $siswa->kelas = $request->kelas;
        $siswa->poin = $request->poin;
        $siswa->save();
        return response(["message" => "Data siswa berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $siswa = Siswa::where("id_siswa", $request->id_siswa)->first();
        $siswa->nis = $request->nis;
        $siswa->nama_siswa = $request->nama_siswa;
        $siswa->kelas = $request->kelas;
        $siswa->poin = $request->poin;
        $siswa->save();
        return response(["message" => "Data siswa berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_siswa)
  {
    try {
      Siswa::where("id_siswa", $id_siswa)->delete();
      return response(["message" => "Data siswa berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>
