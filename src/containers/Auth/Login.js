import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'hoidanit',
            password: '12345'
        }
    }
    handleOnchangeInput = (e) => {
        this.setState({
            username: e.target.value
        })
        console.log(">>check", e.target.value)
    }

    render() {

        return (
            <>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-center"><h1>Login</h1></div>
                            <div className="col-12 form-group">
                                <label for="">Username:</label>
                                <input type="text" value={this.state.username} className="form-control" placeholder='Enter your name'
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label for="">Password:</label>
                                <input type="text" value="" className="form-control" placeholder='Enter your password' />
                            </div>
                            <div className="col-12">
                                <button className='login-btn'>Login</button>
                            </div>
                            <div className="col-12">
                                <span className='login-remind'>Forgot your password</span>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className='login-remind'>Or login with: </span>
                            </div>
                            <div className="col-12 login-icon">
                                <i class="fab fa-google login-gg"></i>
                                <i class="fab fa-facebook-f login-fb"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
