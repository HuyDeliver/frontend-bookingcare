import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import khamchuyenkhoa from '../../assets/images/khamchuyenkhoa.png'
import khamtuxa from '../../assets/images/khamtuxa.png'
import khamtongquat from '../../assets/images/khamtongquat.png'
import dichvuxetnghiem from '../../assets/images/dichvuxetnghiem.png'
import suckhoetinhthan from '../../assets/images/suckhoetinhthan.png'
import khamnhakhoa from '../../assets/images/khamnhakhoa.png'

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChangelang: false,
        }
    }
    handleChangeLang = () => {
        this.setState({
            isChangelang: !this.state.isChangelang
        })
    }
    changeLanguage = (language) => {
        //Khia báo 1 action
        console.log(language)
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language
        console.log(this.props.userInfo)
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo">
                            </div>
                        </div>
                        <div className="center-content">
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.speciality" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.health-facility" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.Doctor" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.fee" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="menu-lang"
                                onClick={() => {
                                    this.changeLanguage(language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI)
                                }
                                }
                            >{language === LANGUAGES.VI ? 'VN' : 'EN'}</div>
                            <div className="menu-support">
                                <i className='fas fa-question-circle'></i>
                                <FormattedMessage id="homeheader.help" />
                            </div>
                        </div>
                    </div>
                </div >
                <div className="home-header-slider">
                    <div className="slider-title">
                        <h1><FormattedMessage id="slider.medical-background" /></h1>
                        <h2><FormattedMessage id="slider.comprehensive-care" /></h2>
                    </div>
                    <div className="slider-search">
                        <i className='fas fa-search'></i>
                        <input type="text" value="" placeholder="Tìm bác sĩ, chuyên khoa, bệnh viện..." />
                    </div>
                    <div className="slider-option">
                        <div className='option-menu'>
                            <div className='option-img'>
                                <img src={khamchuyenkhoa} alt="" />
                            </div>
                            <div>
                                <h4><FormattedMessage id="slider.specialist-exam" /></h4>
                            </div>
                        </div>
                        <div className='option-menu'>
                            <div className='option-img'><img src={khamtuxa} alt="" /></div>
                            <div><h4><FormattedMessage id="slider.telemedicine" /></h4></div>
                        </div>
                        <div className='option-menu'>
                            <div className='option-img'><img src={khamtongquat} alt="" /></div>
                            <div><h4><FormattedMessage id="slider.general-exam" /></h4></div>
                        </div>
                        <div className='option-menu'>
                            <div className='option-img'><img src={dichvuxetnghiem} alt="" /></div>
                            <div><h4><FormattedMessage id="slider.medical-test" /></h4></div>
                        </div>
                        <div className='option-menu'>
                            <div className='option-img'><img src={suckhoetinhthan} alt="" /></div>
                            <div><h4><FormattedMessage id="slider.mental-health" /></h4></div>
                        </div>
                        <div className='option-menu'>
                            <div className='option-img'><img src={khamnhakhoa} alt="" /></div>
                            <div><h4><FormattedMessage id="slider.dental-checkup" /></h4></div>
                        </div>
                    </div>
                </div>
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
