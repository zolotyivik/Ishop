import React, { Component } from "react";

    
class HeaderImg extends Component{




    render(){
        let headerImg = window.site + '/m19/rz.1.html?id=6826645076525986427&type=700';
        return <div className="container-fluid my-2">
            <div className="row no-gutters w-100 m-0 p-0 d-flex justify-content-center">
        <div className="col-12">
            <div className="inner-col radius">
                <div className="img-container"><img src={headerImg} alt="" className="img-fluid w-100"/></div>
            </div>
        </div>
    </div>
        </div>;
    }
}


export default HeaderImg;