import React, {Component, FormEvent} from "react";
import './register.component.css';
import Toast from "../toast";
import axios from "axios";

type Props = {};

type State = {
    redirect: string | null;
    name: string;
    email: string;
    password: string;
};

class Register extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirect: null,
            name: "",
            email: "",
            password: ""
        };
    };

    handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "/api/routes/userRoute",
                {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                },
                {
                  headers: { 'Content-Type': 'application/json' }
                }
            )
            
            Toast.showSuccess("User signed in");
            this.setState({
                redirect: "/boards"
            })
        } catch (e: any) {
            Toast.showFailure(e.message);
            return;
        }
    }

    render() {
        return (
            <div className="register">
                <div className="wrapper-form">
                    <h1 className="register-title">Register</h1>
                    <form onSubmit={this.handleRegister} className="register-form">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                                placeholder={"Name"}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value})}
                                placeholder={"Email"}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                                placeholder={"Password"}
                            />
                        </div>
                        <button type="submit" className="register-button">
                            Register
                        </button>
                        <div className="login-link">
                            <a href="/login">Already have an account?</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;