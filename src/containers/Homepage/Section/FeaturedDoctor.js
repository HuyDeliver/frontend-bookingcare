import { Component } from 'react';
import { connect } from 'react-redux';
import './FeaturedDoctor.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as action from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class FeaturedDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.props.loadTopDoctor();
        this.setState({
            isLoading: true
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topdoctor !== this.props.topdoctor) {
            this.setState({
                arrDoctor: this.props.topdoctor,
                isLoading: false
            });
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let { isLoading } = this.state
        let arrDoctors = this.state.arrDoctor;
        let language = this.props.language;
        return (
            <div className="doctor-section section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span><FormattedMessage id="homepage.outstandingdoctor" /></span>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className="section-body">
                        {isLoading ?
                            <div>Đang tải...</div>
                            :
                            <Slider {...this.props.settings}>
                                {arrDoctors && arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let nameSpecialty = item.Doctor_infor.Specialty.name
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        let nameEN = `${item.positionData.value_EN} ${item.lastName} ${item.firstName}`;
                                        let nameVi = `${item.positionData.value_VN} ${item.lastName} ${item.firstName}`;
                                        return (
                                            <div className="doctor-item" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className="customize-border">
                                                    <div className="outer-bg">
                                                        <div className="doctor-img"><img className='featured-doctor' src={imageBase64} alt="" /></div>
                                                    </div>
                                                    <div className="info-doctor text-center">
                                                        <div>{language === LANGUAGES.VI ? nameVi : nameEN}</div>
                                                        <div className="mt-2 section-name">{nameSpecialty}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topdoctor: state.admin.topdoctor,
});

const mapDispatchToProps = dispatch => ({
    loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor));