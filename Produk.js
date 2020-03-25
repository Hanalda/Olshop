import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";


class Produk extends Component {
  constructor() {
    super();
    this.state = {
      produk: [],
      id_produk: "",
      nama_produk: "",
      stok: "",
      harga: "",
      deskripsi: "",
      image: null,
      action:"",
      find: "",
      message: ""
    };
    if (!localStorage.getItem("Token")) {
      // directs to login page
      // window.location = "/";
    }
  
  }
  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }
  Add = () => {
    // shows modal
    $("#modal_produk").modal("show");
    // empties form data
    this.setState({
      action: "insert",
      id_produk: "",
      nama_produk: "",
      stok: "",
      harga: "",
      deskripsi: "",
      image: null,
    });
  };

  Edit = (item) => {
    // shows modal
    $("#modal_produk").modal("show");
    // empties form data
    this.setState({
      action: "update",
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      stok: item.stok,
      harga: item.harga,
      deskripsi: item.deskripsi,
      image: null,
    });
  };


  get_produk = () => {
    $("#loading").toast("show");
    let url = "http://localhost:8080/olshop/public/produk";
    axios
      .get(url)
      .then(response => {
        this.setState({ produk: response.data.produk });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  };

  Drop = id => {
    if (window.confirm("Are you sure you want to drop this data?")) {
      $("#loading").toast("show");
      let url =
        "http://localhost:8080/olshop/public/produk/drop/" + id;
      axios
        .delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.get_produk();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount = () => {
    this.get_produk();
  };

  Save = event => {
    event.preventDefault();
    console.log(this.state.image)
    // shows loading process
    $("#loading").toast("show");
    // closes modal form
    $("#modal_produk").modal("hide");
    let url = "http://localhost:8080/olshop/public/produk/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("nama_produk", this.state.nama_produk);
    form.append("id_produk", this.state.id_produk);
    form.append("stok", this.state.stok);
    form.append("harga", this.state.harga);
    form.append("deskripsi", this.state.deskripsi);
    form.append("image", this.state.image, this.state.image.name);  
    axios
      .post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_produk();
      })
      .catch(error => {
        console.log(error);
      });
  };

 search = event => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/olshop/public/produk";
      let form = new FormData();
      form.append("find", this.state.find);
      axios
       .post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ produk: response.data.produk });
        })
        .catch(error => {
          console.log(error);
       });
    }
  };

  render(){
    return (
      <div className="container">
      <div className="card mt-2">
        <div className="card-header bg-info">
          <div className="row">
            <div class="col-sm-8">
              <h4 className="text-white">Data Produk</h4>
            </div>
            <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="find"
                  onChange={this.bind}
                  value={this.state.find}
                  onKeyUp={this.search}
                  placeholder="Pencarian..."
                />
              </div>
          </div>
          </div>
           {/* card content */}
           <div className="card-body">
            

            <table className="table">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Stok</th>
                  <th>Harga</th>
                  <th>deskripsi</th>
                  <th>Image</th>   
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                { this.state.produk.map((item) => {
                  return(
                  <tr key={item.id_produk}>
                    <td>{item.nama_produk}</td>
                    <td>{item.stok}</td>
                    <td>{item.harga}</td>
                    <td>{item.deskripsi}</td>
                    <td><img src={'http://localhost:8080/olshop/public/images/' + item.image}
                      alt={item.image} width="200px" height="200px"/>
                    </td> 
                    <td>
                    <button
                          className="m-1 btn btn-sm btn-info"
                          onClick={() => this.Edit(item)}
                        >
                          <span className="fa fa-edit"></span>
                        </button>
                        <button
                          className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id_produk)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>

            <button className="btn btn-success my-2" onClick={this.Add}>
              <span className="fa fa-plus"></span> Tambah Data
            </button>

             {/* siswa modal form */}
             <Modal
              id="modal_produk"
              title="Form Produk"
              bg_header="success"
              text-header="white"
            >
              <form onSubmit={this.Save}>
                Nama Produk
                <input
                  type="text"
                  className="form-control"
                  name="nama_produk"
                  value={this.state.nama_produk}
                  onChange={this.bind}
                  required
                />
                Stok
                <input
                  type="text"
                  className="form-control"
                  name="stok"
                  value={this.state.stok}
                  onChange={this.bind}
                  required
                />
                Harga
                <input
                  type="number"
                  className="form-control"
                  name="harga"
                  value={this.state.harga}
                  onChange={this.bind}
                  required
                />
                Deskripsi
                <input
                  type="text"
                  className="form-control"
                  name="deskripsi"
                  value={this.state.deskripsi}
                  onChange={this.bind}
                  required
                />

                Image 
                <input 
                type="file"
                className="form-control"
                name="image"
                onChange={this.bindImage}
                required
          /> 

                <button className="btn btn-info pull-right m-2">
                  <span className="fa fa-check"></span> Simpan
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      
    );
              }
            }

export default Produk;