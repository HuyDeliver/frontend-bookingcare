import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="medical-facility-section">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="medical-facility-item">
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className="medical-facility-item">
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp2</div>
                            </div>
                            <div className="medical-facility-item">
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp3</div>
                            </div>
                            <div className="medical-facility-item">
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp4</div>
                            </div>
                            <div className="medical-facility-item">
                                <div className="section-img medical-img"></div>
                                <div>Cơ xương khớp5</div>
                            </div>
                            <div className="medical-facility-item">
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

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);