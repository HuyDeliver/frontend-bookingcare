import { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctor } from '../../../../services/userService';
import NumberFormat from 'react-number-format';
import './ProfileDoctor.scss'
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegHospital } from "react-icons/fa";
import _ from 'lodash';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        };
    }

    async componentDidMount() {
        let { doctorID } = this.props
        if (doctorID) {
            this.getInforDoctor(doctorID)
        }

    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctor(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        this.setState({
            dataProfile: result
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            // this.getTimeToday(this.props.language);
        }
        if (this.props.doctorID !== prevProps.doctorID) {
            this.getInforDoctor(this.props.doctorID)
        }
    }

    getTimeToday = (dataTime, language) => {
        let weekday = ''
        let day = ''
        let month = ''
        let year = ''
        let time = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            const inputDate = new Date(dataTime.date);
            let weekdays = []
            // Mảng tên thứ trong tuần
            if (language === LANGUAGES.VI) {
                weekdays = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
            } else if (language === LANGUAGES.EN) {
                weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            }

            // Lấy thông tin ngày, tháng, năm, thứ
            weekday = weekdays[inputDate.getUTCDay()]; // Dùng getUTCDay vì chuỗi có chữ Z (UTC)
            day = inputDate.getUTCDate();
            month = inputDate.getUTCMonth() + 1;
            year = inputDate.getUTCFullYear();
            time = dataTime.timeTypeData && language === LANGUAGES.VI ? dataTime.timeTypeData.value_VN : dataTime.timeTypeData.value_EN

            const formattedDate = `${time} - ${weekday} - ${day}/${month}/${year}`
            return formattedDate
        }
        return ''
    }
    render() {
        let { dataProfile } = this.state
        let { dataTime, language, isShowDs, doctorID } = this.props
        let nameVi = ''
        let nameEN = ''
        if (dataProfile && dataProfile.positionData) {
            nameEN = `${dataProfile.positionData.value_EN} ${dataProfile.firstName} ${dataProfile.lastName} `
            nameVi = `${dataProfile.positionData.value_VN} ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        return (
            <div className="doctor-profile-container">
                <div className='infor-doctor'>
                    <div className='content-wrapper'>
                        <div className="doctor-img" style={{ backgroundImage: `url(${dataProfile.image})` }}></div>
                        {isShowDs === false ?
                            <div className="intro-doctor">
                                <div className='title-doctor'>
                                    {language === LANGUAGES.VI ? nameVi : nameEN}
                                </div>
                                <div className="time-booking">
                                    <div style={{ marginBottom: '4px' }} >
                                        <span><IoCalendarOutline color='#484848' style={{ marginBottom: '4px' }} /></span> &nbsp;
                                        <span>{this.getTimeToday(dataTime, language)}</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center clinic'>
                                    <FaRegHospital color='#484848' style={{ marginBottom: '4px', marginRight: '8px' }} />
                                    {dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.nameClinic ? dataProfile.Doctor_infor.nameClinic : ''}
                                </div>
                                <div className='adressbooking'>
                                    {dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.addressClinic ? dataProfile.Doctor_infor.addressClinic : ''}
                                </div>
                            </div>
                            :
                            <div className='intro-doctor'>
                                <div className='title-doctor'>
                                    {language === LANGUAGES.VI ? nameVi : nameEN}
                                </div>
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                    <div className='job-title'>{dataProfile.Markdown.description}</div>
                                }
                            </div>
                        }
                    </div>
                </div>
                {isShowDs === false ?
                    <div className='price-label mb-3'>
                        <span>
                            {dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceData && language === LANGUAGES.VI ?
                                <>
                                    <strong><FormattedMessage id='patient.booking-modal.price' /></strong> &nbsp;
                                    <NumberFormat
                                        value={dataProfile.Doctor_infor?.priceData.value_VN}
                                        displayType='text'
                                        thousandSeparator={true}
                                        renderText={(value) => (
                                            <span>
                                                {value}<sup>đ</sup>
                                            </span>
                                        )}
                                    />
                                </>
                                :
                                <>
                                    <strong><FormattedMessage id='patient.booking-modal.price' /></strong> &nbsp;
                                    <NumberFormat
                                        value={dataProfile.Doctor_infor?.priceData.value_EN}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix='$'
                                    />
                                </>
                            }</span>
                    </div>

                    : <Link to={`/detail-doctor/${doctorID}`} className='more-profile'>Xem thêm</Link>
                }
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);