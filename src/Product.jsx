import React, { Component } from "react";
import Nav from "./Nav";
import Add from "./Add";
import FF from "./fetch";
import {Redirect} from "react-router-dom";

class Additional extends Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(this);
  }
  createBtn(type, name) {
    let less = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-dash-square-fill svg-less"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
        />
      </svg>
    );

    let more = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-plus-square-fill svg-more"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
        />
      </svg>
    );

    switch (type) {
      case "more":
        if (!name.includes('Сертификат') ) {
          return more;
        }
        return false
        break;
      case "less":
        return less;
        break;
      default:
        break;
    }
  }

  async update(type, product_id) {
    let url = window.site + "/mapi/v2/ishop/basket/update.html";
    let data = {
      user: window.user_id,
      product_id: product_id,
      type: type,
    };

    let req = await FF(url, data);

    if (req.ok) return true;

    return false;
  }

  change() {
    let data = this.props.data;

    switch (this.props.type) {
      case "more":
        data.is_basket_count += 1;

        break;
      case "less":
        if (data.is_basket_count > 1) {
          data.is_basket_count -= 1;
        } else if (data.is_basket_count == 1) {
          data.is_basket_count -= 1;
          data.is_basket = false;
          this.props.delete(data);
        }
        break;

      default:
        break;
    }
    this.update(this.props.type, this.props.data.id);
    this.props.change(data);
  }

  render() {
    let btn = this.createBtn(this.props.type, this.props.data.name);
    return (
      this.props.data.is_basket && btn !== false && (
        <div onClick={this.change} className="additional-wrap">
          {btn}
        </div>
      )
    );
  }
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      redirect : false,
      aniStyle : {
        opacity : "0",
        transition : ".2s",
        transform : "translateX(20%)"
      },
      cart : window.cart
    };
  }

  componentDidMount() {
    if (this.props.location.state != undefined) {
      window.current_product = this.props.location.state;
      this.setState({
        product: this.props.location.state,
      });
    } else {
      if (
        window.current_product &&
        this.props.match.params.product == window.current_product.id
      ) {
        this.setState({
          product: window.current_product,
        });
      } else {
        this.setState({
          redirect : true
        })
        // window.location.href = window.home;
        // this.getProduct(this.props.match.params.product);
      }
    }

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

  

  // async getProduct(id) {
  //   // console.log(id);
  //   this.setState({
  //     product: id,
  //   });
  // }

  render() {
    // console.log(this.props.match);
    console.log(this.state.product);

    return (
      this.state.product && !this.state.redirect ? (
        <div className="product-wrap">
          <Nav back={true} cart={this.state.cart} name={this.state.product.name} />
          <div style={this.state.aniStyle} className="container-fluid over-wrap">
            <div className="row d-flex justify-content-center no-gutters">
              <div className="col-lg-8 col-12">
                <div className="container-fluid">
                  <div className="row no-gutters d-flex justify-content-center">
                    <div className="col-12 col-lg-4 img-col">
                      <div className="inner-col shadow">
                        <img
                          src={
                            window.site +
                            "/m19/rz.1.html?id=" +
                            this.state.product.image +
                            "&type=300"
                          }
                          alt=""
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters mt-3">
                    <div className="col-6 name">
                      <div className="inner-col">
                        <h5>{this.state.product.name}</h5>
                      </div>
                    </div>
                    <div className="col-6 price d-flex justify-content-end">
                      <div className="inner-col">
                        <h5>
                          <strong>{this.state.product.cost} ZV</strong>
                        </h5>
                      </div>
                    </div>
                  </div>

                  {this.state.product.desc != "" ? (
                    <div className="row no-gutters mt-3">
                      <div className="col-12">
                        <div className="inner-col desc shadow">
                          {/* <strong><h4>Описание:</h4></strong> */}
                          <h5
                            dangerouslySetInnerHTML={{
                              __html: this.state.product.desc,
                            }}
                            className=""
                          ></h5>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="row no-gutters my-4">
                    <div className="col-12">
                      <div className="inner-col">
                        <div className="add-to-cart d-flex justify-content-center">
                          <Additional
                            change={(data) => {
                              this.setState({ product: data });
                            }}
                            delete={(item)=> {
                              window.cart = window.cart.filter(i => i.id != item.id);                        
                              this.setState({
                                cart : this.state.cart.filter(i => i.id != item.id)
                              })
                            }}
                            type="less"
                            data={this.state.product}
                          />
                          <Add
                            product_id={this.state.product.id}
                            good={this.state.product}
                            add={(item) => {
                              this.setState({
                                product: item,
                                cart : [...window.cart, item]
                              });
                            }}
                            added={this.state.product.is_basket}
                            clicked_text={
                              "В корзине: " + this.state.product.is_basket_count
                            }
                            text="Добавить в корзину"
                          />
                          <Additional
                            change={(data) => {
                              this.setState({ product: data });
                            }}
                            type="more"
                            data={this.state.product}
                          />
                          {/* <button className="btn btn-zv"></button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : this.state.redirect ? <Redirect to="/" /> : ''
    );
  }
}

export default Product;
