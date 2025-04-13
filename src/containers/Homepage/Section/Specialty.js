import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/images/co-xuong-khop.jpeg'

class Specialty extends Component {

    render() {
        return (
            <div className="section-content section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Chuyên khoa phổ biến</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='section-content'>
                                <div className="section-img Specialty-img"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img Specialty-img"></div>
                                <div>Cơ xương khớp2</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img Specialty-img"></div>
                                <div>Cơ xương khớp3</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img Specialty-img"></div>
                                <div>Cơ xương khớp4</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img Specialty-img"></div>
                                <div>Cơ xương khớp5</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img Specialty-img"></div>
                                <div>Cơ xương khớp6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
