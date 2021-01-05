import React, { Component } from "react";
import {
    Link,
  } from "react-router-dom";
import HeaderImg from "./HeaderImg";

class Header extends Component{




    render(){
        
        
        return <div className="cotnainer-fuild">
            <div className="row no-gutters d-flex justify-content-center m-0">
                <div className="col-lg-7 col-12">
                    <div className="inner-col header-inner-col">
                        <HeaderImg/>
                        
                    </div>
                </div>
            </div>
        </div>
    }
}


export default Header;