import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './FeaturedDoctor.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../HomePage.scss'

class FeaturedDoctor extends Component {

    render() {
        return (
            <div className="section-content section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Bác sĩ nổi bật tuần qua</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='section-content'>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="section-img Doctor-img"></div>
                                    </div>
                                    <div className='Info-doctor text-center'>
                                        <div>Giáo sư , tiến sĩ HuyDeliver</div>
                                        <div>Cơ xương khớp4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="section-img Doctor-img"></div>
                                    </div>
                                    <div className='Info-doctor text-center'>
                                        <div>Giáo sư , tiến sĩ HuyDeliver</div>
                                        <div>Cơ xương khớp4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="section-img Doctor-img"></div>
                                    </div>
                                    <div className='Info-doctor text-center'>
                                        <div>Giáo sư , tiến sĩ HuyDeliver</div>
                                        <div>Cơ xương khớp4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="section-img Doctor-img"></div>
                                    </div>
                                    <div className='Info-doctor text-center'>
                                        <div>Giáo sư , tiến sĩ HuyDeliver</div>
                                        <div>Cơ xương khớp4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="section-img Doctor-img"></div>
                                    </div>
                                    <div className='Info-doctor text-center'>
                                        <div>Giáo sư , tiến sĩ HuyDeliver</div>
                                        <div>Cơ xương khớp4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="customize-border">
                                    <div className="outer-bg">
                                        <div className="section-img Doctor-img"></div>
                                    </div>
                                    <div className='Info-doctor text-center'>
                                        <div>Giáo sư , tiến sĩ HuyDeliver</div>
                                        <div>Cơ xương khớp4</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor

);
