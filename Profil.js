import React from 'react';
import axios from 'axios';
import Modal from "../component/Modal";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Profile from '../image/Profile.jpg';

export default class Profil extends React.Component{
    constructor(){
        super();
        this.state = {
            user: [],
            id: "",
            nama: "",
            email: "",
            password: "",
            role: "user",
            jenis_kelamin: "",
            tgl_lahir: "",
            no_telp: "",
            image: null,
            action: "",
            find: "",
            message: "",
            alamat: [],
            id_pengiriman: "",
            id: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
        }
        if(!localStorage.getItem("Token")){
            //direct ke halaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }
    Edit = (item) => {
        //membuka modal 
        $("#modal_user").modal("show");
        //mengisikan data pada form
        console.log(item.nama)
        this.setState({
            id: item.id,
            nama: item.nama,
            jenis_kelamin: item.jenis_kelamin,
            tgl_lahir: item.tgl_lahir,
            no_telp: item.no_telp,
            image: item.image,
        });
    }

        get_user = () => {
            //$("#loading").toast("show");
            let id = JSON.parse(localStorage.getItem('id_user'))
            //console.log(items)
            let url = "http://localhost:8080/olshop/public/user/"+id;
            axios.get(url)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({
                    user: response.data.user,
                });
                // $("#message").toast("show");
            })
            .catch(error => {
                console.log(error);
            });
            //this.setState({
            //   user: items, 
            //   id: items.id,
            // });
        }

        get_alamat = () => {
            // $("loading").toast("show");
            let id = JSON.parse(localStorage.getItem('id'))

            let url = "http://localhost:8080/olshop/public/alamat/" + id;
            axios.get(url)
            .then(response => {
                this.setState({
                alamat: response.data.alamat,
            });
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
        }
        componentDidMount = () => {
            this.get_user();
            this.get_alamat();
        }

        Add_alamat = () => {
            
            $("#modal_alamat").modal("show");

            this.setState({
                action: "insert",
                id_pengiriman: "",
                id: "",
                nama_penerima: "",
                kode_po: "",
                kecamatan: "",
                kota: "",
                jalan: "",
                rt: "",
                rw: "",
            });
        }

        Edit_alamat = (item) => {
            //membuka modal
            $("#modal_alamat").modal("show");
            //mengisikan data pada form
            this.setState({
                action: "update",
                id_pengiriman: item.id_pengiriman,
                id: item.id,
                nama_penerima: item.nama_penerima,
                kode_pos: item.kode_pos,
                kecamatan: item.kecamatan,
                kota: item.kota,
                jalan: item.jalan,
                rt: item.rt,
                rw: item.rw,
            });
        }

        Save_alamat = (event) => {
            let id = JSON.parse(localStorage.getItem('id'))
            event.preventDefault();
            //menampilkan proses loading
            //$("#loading").toast("show");
            //menutup form modal
            $("#modal_alamat").modal("hide");
            let url = "http://localhost:8080/olshop/public/alamat/save";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("id_pengiriman", this.state.id_pengiriman);
            form.append("id", this.state.id);
            form.append("nama_penerima", this.state.nama_penerima);
            form.append("kode_pos", this.state.kode_pos);
            form.append("kecamatan", this.state.kecamatan);
            form.append("kota", this.state.kota);
            form.append("jalan", this.state.jalan);
            form.append("rt", this.state.rt);
            form.append("rw", this.state.rw);
            // form.append("img_user", this.state.img_user, this.state.img_user.name);
            axios.post(url, form)
            .then(response=> {
                //$("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
        }

        Drop_alamat = (id_pengiriman) => {
            if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
                //$("#loading").toast("hide");
                let url = "http://localhost:8080/olshop/public/alamat/drop/" +id_pengiriman;
                axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({message: response.data.message});
                    $("#message").toast("show");
                    this.get_alamat();
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
        Save = (event) => {
            console.log(this.state.image)
            event.preventDefault();
            //menampilkan proses loading
            // $("#loading").toast("show");
            // menutup form modal 
            let id = localStorage.getItem("id_user")
            $("#modal_user").modal("hide");
            let url = "http://localhost:8080/olshop/public/user/save_profil";
            let form = new FormData();
            form.append("id",id);
            form.append("nama", this.state.nama);
            form.append("jenis_kelamin", this.state.jenis_kelamin);
            form.append("tgl_lahir", this.state.tgl_lahir);
            form.append("no_telp", this.state.no_telp);
            form.append("image", this.state.image, this.state.image.name);
            axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({
                    message: response.data.message});
                $("#message").toast("show");
                this.get_user();
            })
            .catch(error => {
                console.log(error);
            });
        }

    render() {
        const {user, data_pengiriman} = this.state;
        console.log(user)

        return (
            <div className=" container">
                <div className="card mt-2">
                    <div style={{ paddingTop: "5%", paddingLeft:"7%"}}>
                        <div className="#" style={{ maxWidth: "200px"}}>
                            <div className="row no-gutters">
                            {user.map((item,index) => {
                                return (
                                <div className="col-md-4" key={index}>
                                    <img className="rounded float-left" src={'http://localhost:8080/olshop/public/image/' + item.image} 
                                    style={{ height:"240px", width: "200px" }} />
                                    {/* <input aria-hidden="true" type="file" className=" fa fa-upload" name="image"
                                    onChange={this.bindImage} required /> */}
                                </div>
                                    );
                                })}
                                <div style={{ paddingTop:"2%", paddingLeft: "0%"}}>
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ fontWeight: "700"}}>Profile</h4>
                                        <table className="table table-borderless">
                                            {user.map((item,index) => {
                                                return (
                                                    <ul class="list-group" key={index}>
                                                        <li className="list-group-item">Username: {item.nama}</li>
                                                        <li className="list-group-item">Email: {item.email}</li>
                                                        <li className="list-group-item">role: {item.role}</li>
                                                        <li className="list-group-item">Jenis Kelamin: {item.jenis_kelamin}</li>
                                                        <li className="list-group-item">Tanggal Lahir: {item.tgl_lahir}</li>
                                                        <li className="list-group-item">No Telepon: {item.no_telp}</li>
                                                    <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                                                        <span className="fa fa-edit"></span>Edit
                                                    </button>
                                                    </ul>
                                                );
                                            })}

                                            <h4 className="card-title" style={{ fontWeight:"700"}}>Data Alamat</h4>
                                            {this.state.alamat.map((item,index) => {
                                                return(
                                                    <ul class="list-group">
                                                        <li class="list-group-item">Nama Penerima: {item.nama_penerima}</li>
                                                        <li class="list-group-item">Kode Pos: {item.kode_pos}</li>
                                                        <li class="list-group-item">Kecamatan: {item.kecamatan}</li>
                                                        <li class="list-group-item">Kota: {item.kota}</li>
                                                        <li class="list-group-item">Jalan: {item.jalan}</li>
                                                        <li class="list-group-item">RT: {item.rt}</li>
                                                        <li class="list-group-item">RW: {item.rw}</li>
                                                        <li class="list-group-item">
                                                            <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit_alamat(item)}>
                                                                <span className="fa fa-edit">Edit</span>
                                                            </button>
                                                            <button className="m-1 btn btn-sm btn-outline-danger" onClick={() => this.Drop_alamat(item.id_pengiriman)}>
                                                                <span className="fa fa-trash"></span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                               );
                                            })
                                        }
                                        </table>
                                    </div>
                                </div>
                                        <Modal id="modal_user" title="Form User" bg_header="success"
                                        text_header="white">
                                            <form onSubmit={this.Save}>
                                                Username
                                                <input type="text" className="form-control" name="nama" 
                                                value={this.bind.nama} onChange={this.bind} required />
                                                Jenis Kelamin
                                                <input type="text" className="form-control" name="jenis_kelamin" 
                                                value={this.bind.jenis_kelamin} onChange={this.bind} required />
                                                Tanggal Lahir
                                                <input type="date" className="form-control" name="tgl_lahir" 
                                                value={this.bind.tgl_lahir} onChange={this.bind} required />
                                                No Telepon
                                                <input type="number" className="form-control" name="no_telp" 
                                                value={this.bind.no_telp} onChange={this.bind} required />
                                                Image
                                                <input type="file" className="form-control" name="image" 
                                                onChange={this.bindImage} required />
                                            <button type="submit" className="btn btn-info pull-right m-2">
                                                <span className="fa fa-check"></span>Simpan
                                            </button>
                                            </form>
                                        </Modal>

                                        <Modal id="modal_alamat" title="Form Alamat" bg_header="success" text_header="white">
                                            <form onSubmit={this.Save_alamat}>
                                                Nama Penerima
                                                <input type="text" className="form-control" name="nama_penerima"
                                                value={this.state.nama_penerima} onChange={this.bind} required />
                                                Kode Pos
                                                <input type="text" className="form-control" name="kode_pos"
                                                value={this.state.kode_pos} onChange={this.bind} required />
                                                Kecamatan
                                                <input type="text" className="form-control" name="kecamatan"
                                                value={this.state.kecamatan} onChange={this.bind} required />
                                                Kota
                                                <input type="text" className="form-control" name="kota"
                                                value={this.state.kota} onChange={this.bind} required />
                                                Jalan
                                                <input type="text" className="form-control" name="jalan"
                                                value={this.state.jalan} onChange={this.bind} required/>
                                                RT
                                                <input type="text" className="form-control" name="rt"
                                                value={this.state.rt} onChange={this.bind} required />
                                                RW
                                                <input type="text" className="form-control" name="rw"
                                                value={this.state.rw} onChange={this.bind} required />

                                                
                                                <button type="submit" className="btn btn-info pull-right m-2">
                                                    <span className="fa fa-check"></span>Simpan
                                                </button>
                                            </form>
                                        </Modal>

                            </div>
                        </div>
                    </div>
                </div>
                </div>
                );
    }
}