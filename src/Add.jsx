import React, { Component } from "react";
import FF from "./fetch";




class Add extends Component {

    constructor(props){
        super(props);


        this.state = {
            added : this.props.added
        }


        this.click = this.click.bind(this);
    }


    async addProductToBasket(){
        let url = window.site + "/mapi/v2/ishop/basket/create.html";
        let data = {
            user_id : window.user_id,
            good : this.props.product_id,
            data : this.props.good
        }
        let req = await FF(url, data);

        console.log(req);
        if(req.ok){
            window.cart = [...window.cart, req.data]
        }
    }

    // componentDidUpdate(prev){
    //     if (prev.added !== this.props.added) {
    //         this.setState({
    //             added : this.props.added
    //         })
    //     }
    // }


    click() {
        if (!this.props.added) {
            // this.setState({
            //     added : true
            // })
            this.addProductToBasket();
            let item = this.props.good;
            item.is_basket = true;
            item.is_basket_count = 1;
            this.props.add(item);
        }
    }



    render(){
        return <div onClick={this.click} className={this.props.added ? "btn btn-clicked" : "btn btn-zv"}>{this.props.added ? this.props.clicked_text : this.props.text}</div>
    }
}




export default Add;