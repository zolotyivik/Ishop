import React, { Component } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Route
} from "react-router-dom";
import Product from "./Product";
import Cart from "./Cart";
import Home from "./Home";
import Nav from "./Nav";
import Content from "./Content";
import FF from "./fetch";

class App extends Component{
    constructor(props){
      super(props)
      this.state = {
          href : window.location.hash,
          name :  "ZV-Shop",
          cart : 0
      }

      this.location = this.location.bind(this);
      this.getCartCount = this.getCartCount.bind(this);
  }


  componentDidMount(){
     this.getCartCount();
    // window.onpopstate = function(event) {
    //   console.log("location: " + document.location.hash + ", state: " + JSON.stringify(event.state));
    // };
  }

  async getCartCount(){
    let url = window.site + "/mapi/v2/ishop/basket/count.html";
    let data = {user: window.user_id};
    let req = await FF(url, data);
    
    if(req.ok){
      // this.setState({
      //   cart : req.data
      // })
      // window.cart = req.data;
    } else console.error(req);
  }


  componentDidUpdate(prev){
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



  location(loc){

    // // console.log(loc);
    // if (loc.href != this.state.href) {
    //   this.setState({
    //     href : loc.href,
    //     name : loc.name
    //   })
    // }
  } 



  render(){
    console.log(this.props.location);
    // console.log(window.history);
    return <div className="main-shop">
      
      <React.Fragment>
        {/* <Nav name={this.state.name}/> */}
        <div className="content-wrap">
          <Content location={this.state.href}>
            <Route exact path="/" component={Home} />
            <Route exact path="/products/:product" component={Product} />
            
            
            <Route path="/cart">
              <Cart />
            </Route>
          </Content>
        
        </div>
    </React.Fragment>
    </div>;
  }
}


export default App = withRouter(App);
