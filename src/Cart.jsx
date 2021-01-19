import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import Nav from "./Nav";
import FF from "./fetch";
import { Link } from "react-router-dom";
import Deleter from "./Deleter";
import Modal from "./modalW";


class CartAccept extends Component{
  constructor(props){
    super(props);

    this.state = {
      btnText : "Подтвердить"
    }

    this.create = this.create.bind(this);

  }



  async create(){
    this.setState({
      btnText : <span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Минуту..</span>
    })

    let url = window.site + "/mapi/v2/ishop/order/create.html";
    let data = {user:window.user_id};
    let req = await FF(url, data);

    if (req.ok) {
      this.setState({
        btnText : "Готово!"
      })
      setTimeout(() => {
        this.props.unset()
        this.props.erase()
      }, 500);
    } else console.error(req);
  }


  render(){
    return <div className="container-fluid cart-accept">
      <div className="row mt-3">
        <div className="col-12">
          <p>С Вашего <strong>основного</strong> счета будет списано: </p>
          <p className="count"><strong >{this.props.count} ZV денег</strong></p>
          <p>Нажмите кнопку <strong>"Подтвердить"</strong> для подтверждения заказа</p>

          
        </div>
        <div className="col-12 d-flex justify-content-center">
        <div className="my-3">
        <button onClick={this.create} className="btn btn-warning"><strong>{this.state.btnText}</strong></button>
        </div>
        </div>
      </div>
    </div>
  }
}




class Good extends Deleter {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete() {
    console.log("delete");
    this.Delete(window.user_id, this.props.data.id);
    this.props.update(this.props.data);
  }

  render() {
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
    let deleteSign = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-x-circle-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
        />
      </svg>
    );
    return (
      <div className="col-lg-9 col-12">
        <div className="inner-col row-col">
          <span onClick={this.delete} className="position-absolute deleter">
            {deleteSign}
          </span>
          <div className="row my-2 no-gutters">
            <div className="col-3">
              <Link
                to={{
                  pathname: "/products/" + this.props.data.id,
                  state: this.props.data,
                }}
              >
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
              </Link>
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
    );
  }
}

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      modal: false,
      aniStyle : {
        opacity : "0",
        transition : ".2s",
        transform : "translateX(20%)"
      }
    };

    this.getCart = this.getCart.bind(this);
    this.update = this.update.bind(this);
    this.erase = this.erase.bind(this);
    this.createGoods = this.createGoods.bind(this);
  }

  componentDidMount() {
    this.getCart();
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

  update(product) {
    let goods = this.state.goods.filter((item) => item.id != product.id);
    window.cart = window.cart.filter((item) => item.id != product.id);
    this.setState({
      goods: goods,
    });
  }

  createGoods(item, index) {
    return <Good update={this.update} key={index} data={item} />;
  }

  async getCart() {
    let url = window.site + "/mapi/v2/ishop/basket/get.html";
    let data = {
      user: window.user_id,
    };

    let req = await FF(url, data);

    if (req.ok) {
      this.setState({
        goods: req.data,
      });
    }
  }

  erase(){
    window.cart = [];
    this.setState({
      goods : []
    })
  }

  render() {
    console.log(this.state.goods);
    let goods = this.state.goods.map(this.createGoods);
    let sum =
      this.state.goods.length > 0
        ? this.state.goods.reduce(
            (value, prev) => value + prev.cost * prev.is_basket_count,
            0
          )
        : 0;

    let modal = this.state.modal && (
      <Modal
        type="click"
        animate="true"
        unset={(click) => {
          this.setState({ modal: false });
        }}
        width="90%"
        borderRadius="10px"
      >
        <CartAccept erase={this.erase} unset={(click) => {
          this.setState({ modal: false });
        }} count={sum}/>
      </Modal>
    );


    let tooMath = false;
    if (window.balance < sum) {
      tooMath = true
    }
    let logged = window.localStorage.getItem('logged')
    return logged ? (
      <div className="cart-wrap">
        {modal}
        <Nav back={true} cart={this.state.goods} name="Корзина" />
        <div style={this.state.aniStyle} className="container-fluid p-0 over-wrap">
          <div className="row d-flex justify-content-center no-gutters">
            <div className="col-lg-10 col-12">
              {this.state.goods.length > 0 ? (
                <div className="container-fluid">
                  <div className="row my-3 no-gutters d-flex justify-content-center">
                    {goods}
                  </div>

                  <div className="row my-2 d-flex justify-content-center no-gutters">
                    <div className="col-12 col-lg-9">
                      <div className="inner-col d-flex justify-content-between summary">
                        <h5 className="d-block">Итого:</h5>
                        <h5 className="d-block">
                          <strong>{sum} ZV</strong>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="row my-3 no-gutters d-flex align-items-center justify-content-center pb-3">
                    <div className="col-12">
                      <div className="inner-col d-flex align-items-center justify-content-center">
                        {tooMath ? (
                          <button disabled="disabled" className="btn btn-zv">
                            не хватает zv денег
                          </button>
                        ) : (
                          <button onClick={(c)=> {
                            this.setState({
                              modal : true
                            })
                          }} className="btn btn-zv">
                            Оформить
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-100 text-center text-secondary mt-5">
                  <h5>Вы пока ничего не выбрали..</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : <Redirect to="/auth"/>;
  }
}
export default Cart = withRouter(Cart);
