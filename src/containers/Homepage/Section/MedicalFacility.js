import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import medicalImg from '../../../assets/images/co-xuong-khop.jpeg'

class MedicalFacility extends Component {

    render() {
        return (
            <div className="section-content">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='section-content'>
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp2</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp3</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp4</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp5</div>
                            </div>
                            <div className='section-content'>
                                <div className="section-img medical-img"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
