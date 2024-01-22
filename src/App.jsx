import React, { Suspense, lazy, Component } from "react";
import { BrowserRouter as Router, withRouter, Route, Redirect } from "react-router-dom";
import Product from "./Product";
import Cart from "./Cart";
import Home from "./Home";
import Nav from "./Nav";
import Content from "./Content";
import FF from "./fetch";
import Auth from "./Auth";
import GetAuth from "./GetAuth";
import Order from "./Order";
// import { MetaTags } from "react-meta-tags";
// import metaImg from "./meta.jpg";

const MyMetaContext = React.createContext("hello");
// const Order = lazy(() => import('./Order'));

class Error404 extends Component{
  render(){
    console.log('error');
    return <Redirect to="/"/>
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      href: window.location.hash,
      name: "ZV-Shop",
      cart: 0,
    };

    this.location = this.location.bind(this);
    this.getCartCount = this.getCartCount.bind(this);
  }

  checkLogged() {
    let storage = window.localStorage;
    let logged = storage.getItem("logged");
    let user_id = storage.getItem("user_id");
    let name = storage.getItem("name");
    let is_office = storage.getItem("is_office");
    let position = storage.getItem("position");
    if (logged && user_id && position) {
      window.user_id = user_id;
      window.position = position;
      window.name = name;
      window.is_office = is_office === "true";
      window.short_position =
        window.position == "Керівник регіонального структурного підрозділу"
          ? "rd"
          : window.position == "Фахівець з розвитку та навчання персоналу" ||
            window.position == "Менеджер з навчання та розвитку персоналу"
          ? "spec"
          : "price";
      return true;
    } else return false;
  }

  componentDidMount() {
    //  if(!this.checkLogged()) return false;

    this.getCartCount();
    // window.onpopstate = function(event) {
    //   console.log("location: " + document.location.hash + ", state: " + JSON.stringify(event.state));
    // };
  }

  async getCartCount() {
    if (window.user_id) {
      let url = window.site + "/mapi/v2/ishop/basket/count.html";
      let data = { user: window.user_id };
      let req = await FF(url, data);

      if (req.ok) {
        // this.setState({
        //   cart : req.data
        // })
        // window.cart = req.data;
      } else console.error(req);
    }
  }

  componentDidUpdate(prev) {
    // if (this.props.location != prev.location && this.props.location.state != undefined) {
    //   this.setState({
    //     name : this.props.location.state.name
    //   })
    // } else if (this.props.location != prev.location && this.props.location.state == undefined) {
    //   this.setState({
    //     name : "ZV-Shop"
    //   })
    // }
  }

  location(loc) {
    // // console.log(loc);
    // if (loc.href != this.state.href) {
    //   this.setState({
    //     href : loc.href,
    //     name : loc.name
    //   })
    // }
  }

  render() {
    let storage = window.localStorage;

    // let logged = storage.getItem('logged');
    // let user_id = storage.getItem('user_id');
    let loaded = this.checkLogged();
    console.log(loaded);
    // let auth = this.props.location.state ? this.props.location.state.auth : false;
    // console.log(auth);
    // console.log(this.props.location);
    // console.log(window.history);
    return (
      <React.Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          
          {/* <Route exact path="/auth/:id" component={Auth} />
          
          <Route exact path="/auth" component={GetAuth} /> */}
          <div className="main-shop">
            <div className="content-wrap">
              <Content load={loaded} location={this.state.href}>
                <Route exact path="/" component={Home} />
                <Route exact path="/products/:product" component={Product} />
                <Route exact path="/orders/:id" component={Order} />
                <Route path="/cart">
                  <Cart />
                </Route>
                {/* <Route path="*">
                  <Redirect to="/"/>
                </Route> */}
              </Content>
            </div>
          </div>
          
          {/* {!logged && !user_id && !loaded && <Redirect to="/auth"/>} */}
        </Suspense>
      </React.Fragment>
    );
  }
}

export default App = withRouter(App);
