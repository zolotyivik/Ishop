import React, { Component } from "react";
import Header from "./home/Header";
import Products from "./home/Products";
import Nav from "./Nav";
import { Redirect } from "react-router-dom";
import Modal from "./modalW";
import { MetaTags } from "react-meta-tags";
import metaImg from "./meta.jpg";


class HomeData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                transform: "translateY(20%)",
                opacity: 0,
                transition: ".2s"
            },
            wrapStyles: {
                opacity: "0",
                transition: ".2s"
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                styles: {
                    transform: "translateY(0)",
                    opacity: 1,
                    transition: ".2s"
                },
                wrapStyles: {
                    opacity: "1",
                    transition: ".2s"
                }
            })
        }, 100);
    }


    stopClick(e) {
        e.stopPropagation();
        e.cancelBubble = true;
    }



    render() {
        return <div style={this.state.wrapStyles} onClick={this.props.unset} className="home-data-wrap">
            <div style={this.state.styles} onClick={this.stopClick} className="home-data-inner shadow">
                hello
            </div>
        </div>;
    }
}



class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: window.cart,
            modal: false
        }

        this.addToBasket = this.addToBasket.bind(this);
        this.show = this.show.bind(this);
    }



    addToBasket(cart) {
        console.log('add');
        this.setState({
            cart: cart
        })
    }

    show() {
        // this.setState({
        //     modal : !this.state.modal
        // })
    }

    // static contextType = MyMetaContext;
    render() {
        let stor = window.localStorage.getItem('logged');
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
        let name = <span> ЗВ-Shop {dot} <span style={{
            color : "rgb(225, 129, 129)",
            fontSize : ".9em"
        }}>{window.name.split(' ')[0]}</span></span>;
        return stor ? <div className="home">
            {/* <MetaTags>
                <title>ZV - Shop | Интернет магазин портала ZV-Life</title>
                <meta name="description" content="Тут можно купить товары за ЗВ - деньги 😉" />
                <meta property="og:title" content="ZV - Shop" />
                <meta property="og:image" content={metaImg} />
            </MetaTags> */}
            {this.state.modal && <HomeData unset={this.show} />}
            <Nav show={this.show} home={true} cart={this.state.cart} name={name} />
            <div className="home-wrap over-wrap">
                <Header />
                <Products add={this.addToBasket} />
            </div>
        </div> : <Redirect to="/auth" />;
    }
}

export default Home;