import React, { useCallback, useEffect, useState, useContext, Component, FormEvent } from 'react';

import axios from 'axios';
import Toast from '../toast';
import { Navigate } from 'react-router-dom';
import './login.component.css'
type Props = {
    onDataReceived: (data: State['userData'])=> void
};

type State = {
  redirect: string | null;
  isRegisterModalOpen: boolean;
  userData: {
    email: string;
    password: string;
  }
};

export default class Login extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    
        this.state = {
          redirect: null,
          isRegisterModalOpen: false,
          userData: {
            email: "",
            password: "",
          }
        };
    }

    handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try{
            const response = await axios.post(
                "/users/login",
                {
                    name: "",
                    email: this.state.userData.email,
                    password: this.state.userData.password
                },
                {
                  headers: { 'Content-Type': 'application/json' }
                }
            )

            this.props.onDataReceived(response.data);
            Toast.showSuccess("User signed in");
            this.setState({
                redirect: "/boards"
            })
        }catch(e){
            Toast.showFailure("Invalid password");
        }
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                [name]: value
            }
        }));
    };

    render() {
        if (this.state.redirect) {
          return <Navigate to={this.state.redirect} />
        }
    
        return (
            <div className="login">
              <div className="wrapper-form">
                <h3 className="login-title">Devscope Boards</h3>
                <form onSubmit={this.handleLogin}>
                  <input
                      type="email"
                      name="email"
                      value={this.state.userData.email}
                      onChange={this.handleChange}
                      placeholder="Email"
                      required
                  />
                  <br />
                  <input
                      type="password"
                      name="password"
                      value={this.state.userData.password}
                      onChange={this.handleChange}
                      placeholder="Password"
                      required
                  />
                  <button className="login-button" type="submit">Login</button>
                  <div className="login-link">
                    <a href="/register">Don't have an account?</a>
                  </div>
                </form>
              </div>
            </div>
        );
      }
}