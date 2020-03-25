<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "user";
    protected $primaryKey = "id";
    protected $fillable = ["id","nama","email","password","jenis_kelamin","tgl_lahir","no_telp","role", "image"];
}

// public function save_profil(Request $request)
// {
//     $action = $request->action;
//     if ($action == "update"){
//         try{
//             $user = User::where("id",$request->id)->first();
//             $user->nama = $request->nama;
//             $user->email = $request->email;
//             $user->password = $request->password;
//             $user->role = $request->role;
//             $user->jenis_kelamin = $request->jenis_kelamin;
//             $user->tgl_lahir = $request->tgl_lahir;
//             $user->no_telp = $request->no_telp;
//             $user->save();
            
//             return response(["message" => "Data user berhasil ditambahkan"]);
//         } catch (\Exception $e) {
//             return response(["message" => $e->getMessage()]);
//         }
//     }

// }

