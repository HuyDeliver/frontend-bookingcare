import { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';

class About extends Component {
    render() {
        return (
            <div className="about-section section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Truyền thông nói về BookingCare</span>
                    </div>
                    <div className="section-about">
                        <div className="section-video">
                            <iframe
                                width="100%"
                                height="300"
                                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="section-social"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);