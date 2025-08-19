import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });
        }
    }
    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="specialty-section section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span><FormattedMessage id='homepage.specialty' /></span>
                        <button><FormattedMessage id='homepage.more-info' /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => (
                                    <div className="specialty-item" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                        <div className="section-img specialty-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                        <div className="mt-2" style={{ color: '#5f6163', cursor: 'pointer' }}>{item.name}</div>
                                    </div>
                                ))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));