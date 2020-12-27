import React, { Component } from "react";
import Header from "./home/Header";
import Nav from "./Nav";


class Home extends Component{




    render(){
        return <div className="home">
            <Nav name="ZV-Shop"/>
            <Header/>
            
        </div>;
    }
}


export default Home;