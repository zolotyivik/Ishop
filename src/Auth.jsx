import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FF from "./fetch";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.location);
    console.log(this.props.match);
    console.log(this.state.auth);

    this.login(this.props.match.params.id).then((data) => {
      if (data) {
        console.info(data);
        let storage = window.localStorage;
        storage.setItem("logged", true);
        storage.setItem("user_id", data.id);
        storage.setItem("name", data.name);
        storage.setItem("is_office", data.is_office);
        storage.setItem("position", data.position);

        window.user_id = data.id;
        window.position = data.position;
        window.name = data.name;
        window.is_office = data.is_office;
        window.short_position =
          window.position == "Керівник регіонального структурного підрозділу"
            ? "rd"
            : window.position == "Фахівець з розвитку та навчання персоналу" ||
              window.position == "Менеджер з навчання та розвитку персоналу"
            ? "spec"
            : "price";
        this.setState({
          auth: true,
        });
      } else {
        this.props.history.replace("/");
      }
    });
  }

  async login(id) {
    let url = window.site + "/mapi/v2/ishop/login.html";
    let data = {
      user: id,
    };
    let req = await FF(url, data);

    if (!req.ok) return false;

    return req.data;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.auth && (
          <Redirect
            to={{
              pathname: "/",
              state: { auth: true },
            }}
          />
        )}
        ''
      </React.Fragment>
    );
  }
}

export default Auth;
