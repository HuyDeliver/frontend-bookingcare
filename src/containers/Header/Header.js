import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { FormattedMessage } from 'react-intl';
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChangeLang: false
        }
    }

    handleChangelang = () => {
        this.setState({
            isChangeLang: !this.state.isChangeLang
        })
    }
    ChangeLang = (language) => {
        this.props.changeLanguageRedux(language)
    }


    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="languages">
                    <span className='welcome'><FormattedMessage id='homeheader.welcome' />, {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <span className="menu-lang"
                        onClick={() => {
                            this.ChangeLang(language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI

                            )
                        }}
                    >{language === LANGUAGES.VI ? 'VN' : 'EN'}</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log Out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
