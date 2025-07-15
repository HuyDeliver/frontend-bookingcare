import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader';
import './DetailDoctor.scss'
import { getDetailDoctorService } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailDoctorService(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let { detailDoctor } = this.state
        let language = this.props.language
        let nameVi = ''
        let nameEN = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameEN = `${detailDoctor.positionData.value_EN} ${detailDoctor.firstName} ${detailDoctor.lastName} `
            nameVi = `${detailDoctor.positionData.value_VN} ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        return (
            <>
                <HomeHeader isShowbanner={false} />
                <div className="doctor-detail-container">
                    <div className='infor-doctor'>
                        <div className='content-wrapper'>
                            <div className="doctor-img" style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
                            <div className="intro-doctor">
                                <div className='title-doctor'>
                                    <strong>{language === LANGUAGES.VI ? nameVi : nameEN}</strong>
                                </div>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <div className='job-title'>{detailDoctor.Markdown.description}</div>
                                }
                            </div>
                        </div>
                        <div className='schedule-doctor'>
                            <div className="schedule-detail">
                                <DoctorSchedule
                                    detailDoctor={detailDoctor && detailDoctor.id > 0 ? detailDoctor.id : -1}
                                />
                            </div>
                            <div className="contact-doctor">Helloo</div>
                        </div>
                    </div>
                    <div className='detail-info-doctor'>
                        <div>
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                <span dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></span>
                            }
                        </div>
                    </div>
                    <div className="comment"></div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
