import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomeHeader';
import HomeFooter from '../../HomeFooter';
import './DetailClinic.scss'
import _ from 'lodash';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import { getDetailClinic } from '../../../../services/userService';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import BookingInfor from '../Doctor/BookingInfor';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailClinic: {},
            arrDoctorId: []
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinic({
                id: id,
            })
            if (res && res.errCode === 0) {
                let doctorID = []
                let data = res.data
                if (data && !_.isEmpty(data)) {
                    let arr = data.Doctor_infors
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            doctorID.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    detailClinic: res.data,
                    arrDoctorId: doctorID
                })
            }
        }

    }
    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
    }



    render() {
        let { detailClinic, arrDoctorId } = this.state
        return (
            <>
                <HomeHeader />
                <div className="detail-clinic-container">
                    {detailClinic && !_.isEmpty(detailClinic) &&
                        <>
                            <div className="clinic-introdution" style={{ backgroundImage: `url(${detailClinic.bgImage})` }}>
                                <div class="clinic-title">
                                    <div className="pt-4 title-flex">
                                        <div className="clinic-img px-4">
                                            <img src={detailClinic.image} alt="" />
                                        </div>
                                        <div className="clinic-info mt-4">
                                            <div className="clinic-name">
                                                {detailClinic.name}
                                            </div>
                                            <div className="clinic-address">
                                                {detailClinic.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-clinic">
                                <div className="detail-description" dangerouslySetInnerHTML={{ __html: detailClinic.descriptionHTML }}></div>
                            </div>
                        </>
                    }
                    <div className={arrDoctorId && arrDoctorId.length > 0 ? "doctor-with-clinic" : 'no-doctor'}>
                        <div className="container pb-3">
                            <div className="heading">Bác sĩ</div>
                            <hr></hr>
                            {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return (
                                        <div className="row doctor-bg" key={index}>
                                            <div className="doctor-infor col-md-6">
                                                <ProfileDoctor
                                                    doctorID={item}
                                                    isShowDs={true}
                                                />
                                            </div>
                                            <div className="doctor-booking col-md-6">
                                                <div className="doctor-schedule">
                                                    <DoctorSchedule
                                                        detailDoctor={item}
                                                    />
                                                </div>
                                                <div className="booking-info">
                                                    <BookingInfor detailDoctor={item} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        province: state.admin.province
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvinceDoctor: () => dispatch(actions.fetchProvinceStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));