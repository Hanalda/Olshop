import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//Load Navbar
import Navbar from "../component/Navbar";
//Load halaman 

import ProdukClient from "../client/ProdukClient";
import Produk from "../page/Produk";
import User from "../page/User";
import Cart from "../client/Cart";
import Profil from "../page/Profil";
import Login from "../client/Login";
import Register from "../client/Register";
import Order from "../page/Order";




class Main extends Component{
    render = () => {
        return(
            <Switch>
                {/* load component tiap halaman */}
                
                <Route path="/produk">
                    <Navbar />
                    <Produk />
                    
                </Route>

                <Route path="/home">
                    <Navbar />
                    <ProdukClient />
                    
                </Route>

                <Route path="/user">
                    <Navbar />
                    <User />
                    
                </Route>

                <Route path="/cart">
                    <Navbar />
                    <Cart />
                    
                </Route>

                <Route path="/profil">
                    <Navbar />
                    <Profil />
                    
                </Route>

                <Route path="/login">
                    <Login />
                    
                </Route>

                <Route path="/register">
                    <Register />
                    
                </Route>

                <Route path="/order">
                    <Order />
                    
                </Route>
            
             
            </Switch>
        );
    }
}
export default Main;