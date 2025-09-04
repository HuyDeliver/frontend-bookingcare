import { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from '../../../assets/images/handbook.png'
class HandBook extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="handbook-section">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="handbook-item">
                                <div className="section-handbook">
                                    <div className="section-img handbook-img"><img src={image} alt="" /></div>
                                    <div className="section-slogan">Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className="handbook-item">
                                <div className="section-handbook">
                                    <div className="section-img handbook-img"><img src={image} alt="" /></div>
                                    <div className="section-slogan">Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className="handbook-item">
                                <div className="section-handbook">
                                    <div className="section-img handbook-img"><img src={image} alt="" /></div>
                                    <div className="section-slogan">Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className="handbook-item">
                                <div className="section-handbook">
                                    <div className="section-img handbook-img"><img src={image} alt="" /></div>
                                    <div className="section-slogan">Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className="handbook-item">
                                <div className="section-handbook">
                                    <div className="section-img handbook-img"><img src={image} alt="" /></div>
                                    <div className="section-slogan">Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
                            </div>
                            <div className="handbook-item">
                                <div className="section-handbook">
                                    <div className="section-img handbook-img"><img src={image} alt="" /></div>
                                    <div className="section-slogan">Cắt lợi ở đâu tốt và uy tín tại Hà Nội</div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);