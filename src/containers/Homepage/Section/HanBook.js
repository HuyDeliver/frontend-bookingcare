import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
        };
        return (
            <div className="section-content">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className='section-content'>
                                <div className="section-handbook">
                                    <div className="section-img HandBook-img"></div>
                                    <div className='section-slogan'>Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="section-handbook">
                                    <div className="section-img HandBook-img"></div>
                                    <div className='section-slogan'>Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="section-handbook">
                                    <div className="section-img HandBook-img"></div>
                                    <div className='section-slogan'>Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="section-handbook">
                                    <div className="section-img HandBook-img"></div>
                                    <div className='section-slogan'>Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="section-handbook">
                                    <div className="section-img HandBook-img"></div>
                                    <div className='section-slogan'>Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className='section-content'>
                                <div className="section-handbook">
                                    <div className="section-img HandBook-img"></div>
                                    <div className='section-slogan'>Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
