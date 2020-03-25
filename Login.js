import React,{ Component } from "react";
import axios from 'axios';
import Toast from '../component/Toast';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            role: "",
            message: "",
        }
    }
    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost:8080/olshop/public/user/auth";
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);

        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            let role = response.data.user.role;
            if (logged) {
            role === "admin" ? window.location = "/produk" : window.location = "/home" 
            this.setState({message: "Login Berhasil"});
            localStorage.setItem("Token", response.data.token);
            localStorage.setItem("role", JSON.stringify(response.data.user.role));
            //menyimpan data login user ke local storage
            localStorage.setItem("id", JSON.stringify(response.data.user.id));
            } else{
                this.setState({message: "Login Gagal"});
            }
            $("#message".toast("show"));
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        return(
            <div className="container width"
            style={{width: 24 + "rem", paddingTop: 6 + "rem"}}>
                <h3 className="mt-4 text-center">Login</h3>
                <Toast id="message" autohide="false" tittle="Informasi">
                    {this.state.message}
                </Toast>
                <form onSubmit={this.Login} className="mt-4">
                    <div className="form-group mt-4">
                        <input type="email" className="form-control" name="email"
                        placeholder="email" value={this.state.email} onChange={this.bind} />
                    </div>

                    <div className="form-group mt-4">
                        <input type="password" className="form-control" name="password"
                        placeholder="password" value={this.state.password} onChange={this.bind} />
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </form>
                <p className="text-center mt-2">Don't have an account? 
                <Link to="/register">Register</Link>
                </p>
            </div>
        );
    }
}
export default Login;