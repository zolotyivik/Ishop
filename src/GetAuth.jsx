import React, { Component } from "react";
import FF from "./fetch";

class GetAuth extends Component {
    constructor(props) {
        super(props);
        this._input = React.createRef();
        this.state = {
            loading: false,
        };
        this.getLogin = this.getLogin.bind(this);
    }

    getLogin() {
        this.setState({
            loading: true,
        });

        this.login(this._input.current.value).then((data) => {
            if (data) {
                console.log(data);
                let storage = window.localStorage;
                storage.setItem("logged", true);
                storage.setItem('name', data.name);
                storage.setItem("user_id", data.id);
                storage.setItem("position", data.position);

                setTimeout(() => {
                    this.props.history.replace("/");
                }, 1000);
            }

            //   this.setState({
            //     loading : false
            // });
        });
    }

    async login(code) {
        let url = window.site + "/mapi/v2/ishop/login.html";
        let data = {
            code: code,
        };
        let req = await FF(url, data);

        if (!req.ok) return false;

        return req.data;
    }

    render() {
        console.log(this.props.location);
        return (
            <div className="container_fluid get-auth">
                <div className="row no-gutters h-100 d-flex align-items-center justify-content-center">
                    <div className="col-lg-4 col-8">
                        <div className="inner-col">
                            <div className="form-group d-flex align-items-center flex-column justify-content-center">
                                <label htmlFor="login" className="text-light w-100 text-center">
                                    Введите свой ИНН
                                </label>
                                <input
                                    id="login"
                                    ref={this._input}
                                    type="text"
                                    className="form-control"
                                />
                                {this.state.loading ? (
                                    <button disabled="disabled" className="btn bg-light mt-2">
                                        <span
                                            className="spinner-border spinner-border-sm mr-1"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                            Вхожу
                                    </button>
                                ) : (
                                        <button onClick={this.getLogin} className="btn bg-light mt-2">
                                            Войти
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GetAuth;
