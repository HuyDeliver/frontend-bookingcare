import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
            isChangeLang: false
        };
    }

    componentDidMount() {
        this.setMenuByRole();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setMenuByRole();
        }
    }

    setMenuByRole = () => {
        const { userInfo } = this.props;
        let menu = [];

        if (userInfo && !_.isEmpty(userInfo)) {
            const { roleID } = userInfo;

            switch (roleID) {
                case USER_ROLE.ADMIN:
                    menu = adminMenu;
                    break;
                case USER_ROLE.DOCTOR:
                    menu = doctorMenu;
                    break;
                case USER_ROLE.PATIENT:
                    // Patient không có menu system
                    menu = [];
                    break;
                default:
                    menu = [];
                    break;
            }
        }

        this.setState({
            menuApp: menu
        });
    }

    handleChangelang = () => {
        this.setState({
            isChangeLang: !this.state.isChangeLang
        });
    }

    ChangeLang = (language) => {
        this.props.changeLanguageRedux(language);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        if (!userInfo || _.isEmpty(userInfo)) {
            return null;
        }

        const { firstName, lastName, roleID } = userInfo;
        const displayName = firstName || lastName || 'User';

        return (
            <div className="header-container">
                {this.state.menuApp.length > 0 && (
                    <div className="header-tabs-container">
                        <Navigator menus={this.state.menuApp} />
                    </div>
                )}

                <div className="languages">
                    <span className='welcome'>
                        <FormattedMessage id='homeheader.welcome' />, {displayName}
                        <span className="user-role" style={{ fontSize: '12px', marginLeft: '5px', opacity: 0.7 }}>
                            ({roleID})
                        </span>
                    </span>

                    <span
                        className="menu-lang"
                        onClick={() => {
                            this.ChangeLang(language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI);
                        }}
                    >
                        {language === LANGUAGES.VI ? 'VN' : 'EN'}
                    </span>

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