import React, { Component } from "react";
import get from "../fetch";
import Add from "../Add";
import { Link } from "react-router-dom";
import "../lds.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgClass: "img-fluid",
      loaderClass: "w-100 img-wrap animated",
      wrapStyle: {},
    };
    this.loader = this.loader.bind(this);
  }
  loader() {
    this.setState({
      imgClass: "img-fluid loaded",
      loaderClass: "w-100 img-wrap loaded",
    });
  }

  render() {
    return (
      <div className="col-lg-2 p-0 p-lg-3 col-6">
        <div style={this.state.wrapStyle} className="inner-col wrap-col p-1">
          <Link
            to={{
              pathname: "/products/" + this.props.data.id,
              state: this.props.data,
            }}
          >
            <div className={this.state.loaderClass}>
              <img
                onLoad={this.loader}
                src={
                  window.site +
                  "/m19/rz.1.html?id=" +
                  this.props.data.image +
                  "&type=200"
                }
                alt=""
                className={this.state.imgClass}
              />
            </div>
          </Link>

          <div className="row no-gutters">
            <div className="col-6">
              <h5 className="name">{this.props.data.name}</h5>
              <h5 className="cost">{this.props.data.cost} zv</h5>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-start">
              <Add
                added={this.props.data.is_basket}
                add={this.props.add}
                product_id={this.props.data.id}
                good={this.props.data}
                clicked_text="в корзине"
                text="добавить"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      no: false,
      products: [],
      aniStyle : {
        opacity : "0",
        transition : ".2s",
        transform : "translateX(20%)"
      }
    };

    this.getProducts = this.getProducts.bind(this);
    this.createProductsItem = this.createProductsItem.bind(this);
  }

  async getProducts() {
    let url = window.site + "/mapi/v2/ishop/products/get.html";
    let data = {
      user_id: window.user_id,
      position: window.short_position,
    };
    let req = await get(url, data);

    if (req.ok) {
      //   window.products = req.data;
      this.setState({
        products: req.data.goods,
      });
      if (req.data.basket.length > 0) {
        window.cart = req.data.basket;
        this.props.add(window.cart);
      }
    } else {
      this.setState({
        no: true,
      });
    }
  }

  componentDidMount() {
    // if (window.products.length == 0) {

    // }
    this.getProducts();
    setTimeout(() => {
      this.setState({
        aniStyle : {
          opacity : "1",
          transition : ".2s",
          transform : "translateX(0)"
        }
      })
    }, 200);
  }

  createProductsItem(item, index) {
    return (
      <Product
        key={index}
        add={(product) => {
          let prev = this.state.products;
          prev[product.index] = product;
          this.setState({
            products: prev,
          });
          this.props.add([...window.cart, item]);
        }}
        index={index}
        data={item}
      />
    );
  }

  render() {
    let products = this.state.products.map(this.createProductsItem);
    let loader = <div className="w-100 mt-5 d-flex justify-content-center"><div className="lds-heart"><div></div></div></div>
    // console.log(this.state.products);
    return (
      <div className="products-wrap">
        <div className="container-fluid">
        {this.state.products.length > 0 ? '' : loader}
          <div style={this.state.aniStyle} className="row no-gutters mt-lg-3 mt-1 d-flex justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row px-3">{products}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
