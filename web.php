<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    // return $router->app->version();
    return str_random(40);
});
//$router->get('/siswa','SiswaController@get');
//$router->post('/siswa','SiswaController@find');
//$router->post('/siswa/save','SiswaController@save');
//$router->delete('/siswa/drop/{id_siswa}','SiswaController@drop');
//
$router->get('/produk','ProdukController@get');
$router->post('/produk','ProdukController@find');
$router->post('/produk/save','ProdukController@save');
$router->delete('/produk/drop/{id_produk}','ProdukController@drop');
//
$router->get('/user','UserController@get');
$router->get('/user/{id}','UserController@getByid');

$router->post('/user','UserController@find');
$router->post('/user/save','UserController@save');
$router->delete('/user/drop/{id}','UserController@drop');

$router->post('/register', 'UserController@register');
$router->post("/user/auth", "UserController@auth");

$router->post('/user/save_profil','UserController@save_profil');

$router->get('/alamat/{id_user}','AlamatController@getByUser');

$router->get("/order", "OrderController@get");
$router->post("/accept/{id_order}", "OrderController@accept");
$router->post("/decline/{id_order}", "OrderController@decline");


//$router->get('/pelanggaran_siswa','PelanggaranSiswaController@get');
//$router->post('/pelanggaran_siswa/save','PelanggaranSiswaController@save');
//$router->delete('/pelanggaran_siswa/drop/{id_siswa}','PelanggaranSiswaController@drop');



