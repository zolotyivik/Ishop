import React, { Component } from "react";
import "./css/modalW.css";

class ModalW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapStyle: {
        position: "fixed",
        height: "100%",
        width: "100%",
        background: "rgba(0,0,0,0.3)",
        top: "0",
        left: "0",
        zIndex: "120",
        overflow: "auto",
      },
      contentStyle: {
        position: "relative",
        zIndex: "130",
        borderRadius : this.props.borderRadius,
        maxWidth: this.props.width,
        background: "#fff",
        left: "calc((100% - " + this.props.width + ") /2 )",
        minHeight: "10%",
        top: "10%",
        transition: ".2s",
      },
      animateContentStyle: {
        position: "relative",
        zIndex: "130",
        borderRadius : this.props.borderRadius,
        maxWidth: this.props.width,
        background: "#fff",
        left: "calc((100% - " + this.props.width + ") /2 )",
        minHeight: "10%",
        top: "10%",
        transform: "translateY(-100vh)",
        transition: ".2s",
      },
      contentAnimaClases: "modalw-inner shadow position-relative extra-mb-8",
    };

    this.unset = this.unset.bind(this);
    this.shakeAnimate = this.shakeAnimate.bind(this);
  }

  componentDidMount() {
    if (this.props.animate) {
      setTimeout(() => {
        this.setState({
          animateContentStyle: {
            position: "relative",
            zIndex: "130",
            borderRadius : this.props.borderRadius,
            maxWidth: this.props.width,
            background: "#fff",
            left: "calc((100% - " + this.props.width + ") /2 )",
            minHeight: "10%",
            top: "10%",
            transform: "translateY(0)",
            transition: ".2s",
          },
        });
      }, 200);
    }
  }

  shakeAnimate(){
    this.setState({
      contentAnimaClases: "modalw-inner shadow position-relative extra-mb-8 check-content-alert",
    });
    setTimeout(() => {
      this.setState({
        contentAnimaClases: "modalw-inner shadow position-relative extra-mb-8",
      });
    }, 300);
  }

  stopClick(e) {
    e.stopPropagation();
    e.cancelBubble = true;
  }

  unset() {
    switch (this.props.type) {
      case "click":
        this.props.unset();
        break;
      case "shaked":
        this.shakeAnimate();
        break;

      default:
        break;
    }
  }

  render() {
    let closeStyle = {
      position: "absolute",
      right: "15px",
      top: "15px",
    };
    return (
      <React.Fragment>
        <div
          style={this.state.wrapStyle}
          onClick={this.unset}
          className="modalw-wrap"
        >
          <div
            style={
              this.props.animate
                ? this.state.animateContentStyle
                : this.state.contentStyle
            }
            onClick={this.stopClick}
            className={this.state.contentAnimaClases}
          >
            {this.props.close || this.props.type != "click" ? (
              <svg
                style={closeStyle}
                onClick={this.props.unset}
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                className="bi bi-x-circle-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                />
              </svg>
            ) : (
              ""
            )}
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ModalW;
