import React, { Component } from "react";
import { withRouter } from "react-router";
import Nav from "./Nav";


class Cart extends Component{


    componentDidMount(){
      
    }

    render(){
        console.log(); 
        return <div className="cart-wrap">
             <Nav name="Корзина"/>
        </div>;
    }
}


export default Cart = withRouter(Cart);