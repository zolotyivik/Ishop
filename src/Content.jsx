import React, { Component } from "react";


class Content extends Component{
    constructor(props){
        super(props)
        this.state = {
            style  : {
                transform : "translateY(20%)",
                opacity : "0"
            }
        }
    }



    componentDidMount(){
        setTimeout(() => {
            this.setState({
                style  : {
                    transform : "translateY(0)",
                    opacity : "1"
                }
            })
        }, 100);
    }


    componentDidUpdate(prev){
        if (this.props != prev) {
            console.log('update');
            this.setState({
                style  : {
                    transform : "translateY(20%)",
                    opacity : ".5"
                }
            })
            setTimeout(() => {
                this.setState({
                    style  : {
                        transform : "translateY(0)",
                        opacity : "1"
                    }
                })
            }, 200);
        }
    }


    render(){
        console.log(this.props.location);
        return <div style={this.state.style} className="content">
            {this.props.children}
        </div>
    }
}


export default Content;