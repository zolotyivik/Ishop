import React, { Component } from "react";
import FF from "./fetch";
import Nav from "./Nav";

class Products extends Component {





    render(){
        let xSign = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          );
        return <div className="row no-gutters justify-content-center">
            <div className="col-lg-9 col-12">
                <div className="inner-col row-col">
                
                <div className="row my-2 no-gutters">
                    <div className="col-3">
                    <div className="inner-col img-col">
                        <img
                            className="img-fluid shadow"
                            src={
                            window.site +
                            "/m19/rz.1.html?id=" +
                            this.props.data.image +
                            "&type=100"
                            }
                            alt=""
                        />
                        </div>
                    </div>
                    <div className="col-4 d-flex align-items-center overflow-hidden">
                    <div className="inner-col pl-2 name-col">
                        <h5>{this.props.data.name}</h5>
                    </div>
                    </div>
                    <div className="col-5 d-flex align-items-center justify-content-between">
                    <div className="inner-col d-flex price-col mr-3">
                        <h5>{this.props.data.is_basket_count}</h5>
                        <span>{xSign}</span>
                        <h5>{this.props.data.cost}</h5>
                    </div>
                    <div className="inner-col d-flex sum-price-col mr-3">
                        <strong>
                        <h5>
                            {this.props.data.is_basket_count * this.props.data.cost}
                        </h5>
                        </strong>
                    </div>
                    </div>
                </div>
                </div>
        </div>
        </div>
    }
}



class Order extends Component{
    constructor(props){
        super(props);

        this.state = {
            error : false,
            products : []
        }


        this.getOrderData = this.getOrderData.bind(this);
    }

    componentDidMount(){
        this.getOrderData();
    }

    componentDidUpdate(prev){
        if (prev.match != this.props.match) {
            this.getOrderData();
        }
    }




    async getOrderData(){
        let url = window.site + "/mapi/v2/ishop/order/get.html";
        let data = {
            id : this.props.match.params.id
        }

        let req = await FF(url,data);

        if (req.ok) {
            this.setState({
                products : req.data,error : false
            })
        } else this.setState({error: true})
    }


    createProducts(item, index){
        return <Products data={item} key={"oreders_products_" + index}/>
    }

    render(){
        let prods = this.state.products.map(this.createProducts);

        let wrapClass = window.user_id ? "" : "content";
        let sum =
      this.state.products.length > 0
        ? this.state.products.reduce(
            (value, prev) => value + prev.cost * prev.is_basket_count,
            0
          )
        : 0;
        let dot = <span  style={{
            height : "8px",
            width : "8px",
            margin : "0 4px",
            marginBottom : "2px",
            display : "inline-block",
            backgroundColor : "#fff",
            borderRadius : "50%"
        }}></span>;
        // let name = "ZV-Shop" + dot + window.name.split(' ')[0];
        let name = this.state.products.length > 0 ? this.state.products[0].user_name.split(' ') : []
        let navName = <span> ZV-Shop {dot} <span style={{
            color : "rgb(225, 129, 129)",
            fontSize : ".9em"
        }}>{name[0]}</span></span>;
        return !this.state.error ? <div className={wrapClass}>
            <Nav show={()=> {}} home={true} name={navName} />
             <div className="container-fluid cart-wrap my-4">
                 <div className="row no-gutters">
                     <div className="col-12 text-left mb-2">
                         <h5><strong>Одержувач: </strong>{name.reduce((prev,curr,) => (prev + ' ' + curr),'')}</h5>
                     </div>
                 </div>
                 {prods}
                 <div className="row my-2 d-flex justify-content-center no-gutters">
                    <div className="col-12 col-lg-9">
                      <div className="inner-col d-flex justify-content-between summary">
                        <h5 className="d-block">Разом:</h5>
                        <h5 className="d-block">
                          <strong>{sum} ZV</strong>
                        </h5>
                      </div>
                    </div>
                  </div>
             </div>
        </div> : 
        <div className={wrapClass}>
            <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="text-center mt-5">
                        <strong><h4 className="text-secondary">номер замовлення недійсний</h4></strong>
                    </div>
                </div>
            </div>
        </div>
        </div>
        ;
    }
}





export default Order;