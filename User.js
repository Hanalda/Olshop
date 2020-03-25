import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id: "",
      nama: "",
      email: "",
      password: "",
      role: "",
      image: null,
      jenis_kelamin: "",
      tgl_lahir: "",
      no_telp: "",
      action: "",
      find: "",
      message: ""
    };

    // if token doesn't exist in local storage
    if (!localStorage.getItem("Token")) {
      // directs to login page
      //  window.location = "/";
    }
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }
  

  Add = () => {
    // shows modal
    $("#modal_user").modal("show");
    // empties form data
    this.setState({
      action: "insert",
      id: "",
      nama: "",
      email: "",
      password: "",
      role: "",
      image: null,
      jenis_kelamin: "",
      tgl_lahir: "",
      no_telp: "",
    });
  };

  Edit = (item) => {
    // shows modal
    $("#modal_user").modal("show");
    // empties form data
    this.setState({
      action: "update",
      id: item.id,
      nama: item.nama,
      email: item.email,
      password: item.password,
      role: item.role,
      image: null,
      jenis_kelamin: item.jenis_kelamin,
      tgl_lahir: item.tgl_lahir,
      no_telp: item.no_telp,
    });
  };

  get_user = () => {
    $("#loading").toast("show");
    let url = "http://localhost:8080/olshop/public/user";
    axios
      .get(url)
      .then(response => {
        this.setState({ user: response.data.user });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  };

  Drop = id => {
    if (window.confirm("Are you sure you want to drop this data?")) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/olshop/public/user/drop/" + id;
      axios
        .delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.get_user();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount = () => {
  this.get_user();
  };

  Save = event => {
    event.preventDefault();
    console.log(this.state.image)
    // shows loading process
    $("#loading").toast("show");
    let id = JSON.parse(localStorage.getItem('id_user'));
    // closes modal form
    $("#modal_produk").modal("hide");
    let url = "http://localhost:8080/olshop/public/user/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", 5);
    form.append("nama", this.state.nama);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("image", this.state.image, this.state.image.name);
    form.append("jenis_kelamin", this.state.jenis_kelamin);
    form.append("tgl_lahir", this.state.tgl_lahir);
    form.append("no_telp", this.state.no_telp);
    form.append("role", this.state.role);

    axios
      .post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });
  };


  search = (event) => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost:8080/olshop/public/user";
      let form = new FormData();
      form.append("find", this.state.find);
      axios
        .post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ user: response.data.user });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card mt-2">
          {/* card header */}
          <div className="card-header bg-info">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data User</h4>
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
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            <Toast id="loading" autohide="false" title="Informasi">
              <span className="fa fa-spin fa-spinner"></span> Loading
            </Toast>
            <table className="table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Image</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>No Telpon</th>
                  <th>Role</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {this.state.user.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td><img src={'http://localhost:8080/olshop/public/image/' + item.image}
                      alt={item.image} width="200px" height="200px"/></td>
                      <td>{item.jenis_kelamin}</td>
                      <td>{item.tgl_lahir}</td>
                      <td>{item.no_telp}</td>
                      <td>{item.role}</td>
                      <td><button
                          className="m-1 btn btn-sm btn-info"
                          onClick={() => this.Edit(item)}
                        >
                          <span className="fa fa-edit"></span>
                        </button>
                        <button
                          className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* add button */}
            <button className="btn btn-success my-2" onClick={this.Add}>
              <span className="fa fa-plus"></span> Tambah Data
            </button>

            {/* user modal form */}
            <Modal
              id="modal_user"
              title="Form User"
              bg_header="success"
              text-header="white"
            >
              <form onSubmit={this.Save}>
                Nama
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  value={this.state.nama}
                  onChange={this.bind}
                  required
                />
                Email
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.bind}
                  required
                />
                Password
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={this.state.password}
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

                Jenis Kelamin
                <input
                  type="text"
                  className="form-control"
                  name="jenis_kelamin"
                  value={this.state.jenis_kelamin}
                  onChange={this.bind}
                  required
                />

                Tanggal Lahir
                <input
                  type="date"
                  className="form-control"
                  name="tgl_lahir"
                  value={this.state.tgl_lahir}
                  onChange={this.bind}
                  required
                />

                No Telpon
                <input
                  type="number"
                  className="form-control"
                  name="no_telp"
                  value={this.state.no_telp}
                  onChange={this.bind}
                  required
                />

                <div className="form-group">
                  <label for="role">Role</label>
                  <select class="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    
                  </select>
                </div>
                
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

export default User;