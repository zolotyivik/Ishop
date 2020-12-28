import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";
class Cart extends Component {
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
      </div>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#/">
          {this.props.name}
        </a>
        <div className="right-corner d-flex align-items-center h-100 text-light">
        <span className="current-money">3500 zv</span>
          <Link to="/cart">
            <Cart />
          </Link>
          
        </div>
      </nav>
    );
  }
}

export default Nav;
