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
import * as action from '../../../store/actions'
import { LANGUAGES } from '../../../utils';

class FeaturedDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topdoctor !== this.props.topdoctor) {
            this.setState({
                arrDoctor: this.props.topdoctor
            })
        }
    }

    render() {
        let arrDoctors = this.state.arrDoctor
        let language = this.props.language
        console.log("check state", arrDoctors)
        return (
            <div className="section-content section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span><FormattedMessage id="homepage.outstandingdoctor" /></span>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary')
                                    }
                                    let nameEN = `${item.positionData.value_EN} ${item.lastName} ${item.firstName}`
                                    let nameVi = `${item.positionData.value_VN} ${item.lastName} ${item.firstName}`
                                    return (
                                        <div className='section-content' key={index}>
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div className="section-img Doctor-img" style={{ backgroundImage: `url(${imageBase64})` }}>
                                                    </div>
                                                </div>
                                                <div className='Info-doctor text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEN}</div>
                                                    <div>Cơ xương khớp4</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topdoctor: state.admin.topdoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(action.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor

);
