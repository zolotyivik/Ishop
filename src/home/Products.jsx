import React, { Component } from "react";
import get from "../fetch";

    
class Products extends Component{

    constructor(props){
        super(props);

        this.state = {
            products : []
        }
    
    this.getProducts = this.getProducts.bind(this);
        
    }




    async getProducts() {
        let url = window.site + "/mapi/v2/ishop/products/get.html";
        let data = {
            user_id : window.user_id
        }
        let req = await get(url, data);

        console.log(req);
    }

    componentDidMount(){
        this.getProducts();
    }



    render(){
        return '';
    }
}


export default Products;