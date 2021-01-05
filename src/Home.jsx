import React, { Component } from "react";
import Header from "./home/Header";
import Products from "./home/Products";
import Nav from "./Nav";


class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            cart : window.cart
        }

        this.addToBasket = this.addToBasket.bind(this);
    }



    addToBasket(cart){
        console.log('add');
        this.setState({
            cart : cart
        })
    }


    render(){
        return <div className="home">
            <Nav cart={this.state.cart} name="ZV-Shop"/>
            <div className="home-wrap over-wrap">
                <Header />
                <Products add={this.addToBasket} />                     
            </div>
        </div>;
    }
}


export default Home;