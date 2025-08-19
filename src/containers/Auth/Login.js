import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
            errMessage: ''
        }
    }
    handleOnchangeInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleOnchangePass = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }
    handleKeydown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin()
        }
    }
    render() {

        return (
            <>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-center"><h1>Login</h1></div>
                            <div className="col-12 form-group  form-input">
                                <label for="">Username:</label>
                                <input type="text" value={this.state.username} className="form-control" placeholder='Enter your name'
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                            </div>
                            <div className="col-12 form-group  form-input">
                                <label for="">Password:</label>
                                <div className="custom-input">
                                    <input type={this.state.isShowPass ? 'text' : 'password'} value={this.state.password} className="form-control" placeholder='Enter your password'
                                        onChange={(e) => this.handleOnchangePass(e)}
                                        onKeyDown={(e) => this.handleKeydown(e)}
                                    />
                                    <span onClick={() => this.handleShowHidePass()}>
                                        <i className={this.state.isShowPass ? 'icon-eye fa fa-eye' : 'icon-eye fa fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>{this.state.errMessage}</div>
                            <div className="col-12">
                                <button className='login-btn' onClick={() => this.handleLogin()}>Login</button>
                            </div>
                            <div className="col-12">
                                <span className='login-remind'>Forgot your password</span>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className='login-remind'>Or login with: </span>
                            </div>
                            <div className="col-12 login-icon">
                                <i className="fab fa-google login-gg"></i>
                                <i className="fab fa-facebook-f login-fb"></i>
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
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
