import React, { Component } from "react";
import { Link } from "react-router-dom";
import get from "./fetch";
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aniStyle: {
        transform: "translateY(0)",
        transition: ".1s"
      }
    }
  }


  componentDidUpdate(prev) {
    if (this.props.count != prev.count) {
      setTimeout(() => {
        this.setState({
          aniStyle: {
            transform: "translateY(-40%)",
            transition: ".1s"
          }
        })
      }, 100);

      setTimeout(() => {
        this.setState({
          aniStyle: {
            transform: "translateY(0)",
            transition: ".2s"
          }
        })
      }, 200);
    }
  }


  render() {
    return (
      <div className="icon-wrap d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
          />
        </svg>
        {this.props.count > 0 ? <span style={this.state.aniStyle} className="count">{this.props.count}</span> : ''}
      </div>
    );
  }
}

class Money extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: false,
      loading : true,
      error : false
    }
  }

  async getMoney() {
    let url = window.site + "/mapi/v2/ishop/money/get.html";
    let data = {
      user_id: window.user_id
    };
    let req = await get(url, data);

    if (req.ok) {
      window.balance = req.data.balance;
      this.setState({
        balance: req.data.balance,
        loading : false,
        error : false
      })
    } else {
      this.setState({
        balance: 0,
        loading : false,
        error : true
      })
    }
  }

  componentDidMount() {
    if (window.balance === false) {
      this.getMoney();
    } else {
      this.setState({
        balance: window.balance,
        loading : false
      })
    }

  }





  render() {
    let zv = <strong> ЗВ</strong>
    return <span>
      {this.state.loading ? 'loading' : !this.state.error ? <span>{this.state.balance} {zv}</span> : ''}
    </span>



  }
}

class Nav extends Component {


  home(props) {
    if (props.home) {
      
    }
  }




  render() {
    let back = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z" />
    </svg>
    return (
      <nav className="navbar ps-3 navbar-dark">
        <a onClick={this.props.home && this.props.show} className="navbar-brand d-flex align-items-center" href="#/">
          {this.props.back && <span className="back d-flex me-2 mt-1">
            {back}
          </span>}
          {this.props.name}
        </a>
        <div className="right-corner d-flex align-items-center h-100 text-light">
          <span className="current-money">
            <Money />
          </span>
          {this.props.cart ?  <Link to="/cart">
            <Cart count={this.props.cart.length} />
          </Link> : ''}
         

        </div>
      </nav>
    );
  }
}

export default Nav;
