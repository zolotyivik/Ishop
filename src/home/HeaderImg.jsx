import React, { Component } from "react";

    
class HeaderImg extends Component{




    render(){
        let headerImg = 'https://zv-life.zolotoyvek.ua/m19/rz.1.html?id=6826645076525986427&type=700';
        return <div className="row w-100 m-0 p-0">
        <div className="col-12">
            <div className="inner-col">
                <div className="img-container"><img src={headerImg} alt="" className="img-fluid"/></div>
            </div>
        </div>
    </div>;
    }
}


export default HeaderImg;