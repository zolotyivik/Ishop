import React, { Component } from "react";
import {
    Link,
  } from "react-router-dom";
import HeaderImg from "./HeaderImg";

class Header extends Component{




    render(){
        
        return <div className="cotnainer-fuild">
            <div className="row m-0">
                <div className="col-11">
                    <div className="inner-col header-inner-col">
                        <HeaderImg/>
                    </div>
                </div>
            </div>
        </div>
    }
}


export default Header;