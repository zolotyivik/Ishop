import React, { Component } from "react";


class Nav extends Component{




    render(){
        return <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
         {this.props.name}
        </a>
        <span className="current-money">3500 zv</span>
      </nav>;
    }
}


export default Nav;