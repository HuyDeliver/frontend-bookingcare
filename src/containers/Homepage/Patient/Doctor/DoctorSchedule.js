import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../Modal/BookingModal';
import { emitter } from '../../../../utils/emitter';
import _ from 'lodash';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailbleTime: [],
            selectedDate: null,
            isOpenModal: false,
            dataScheduleTimeModal: {},
        };
    }

    async componentDidMount() {
        // Thiết lập danh sách ngày
        this.setArrDay(this.props.language);

        // Chờ cho đến khi allDays được thiết lập
        if (this.props.detailDoctor > 0) {
            await this.checkAndSetFirstAvailableDay();
        }

        emitter.on('BOOKING_SUCCESS', this.handleBookingSuccess);
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setArrDay(this.props.language);
        }
        if (
            this.props.detailDoctor !== prevProps.detailDoctor &&
            this.props.detailDoctor > 0 &&
            this.state.allDays.length > 0
        ) {
            this.checkAndSetFirstAvailableDay();
        }
    }

    setArrDay = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment(new Date()).add(i, 'days');

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    object.label = `Hôm nay - ${date.format('DD/MM')}`;
                } else {
                    object.label = `${date.format('dddd')} - ${date.format('DD/MM')}`;
                    object.label = object.label.charAt(0).toUpperCase() + object.label.slice(1);
                }
            } else {
                if (i === 0) {
                    object.label = `Today - ${date.locale('en').format('DD/MM')}`;
                } else {
                    object.label = `${date.locale('en').format('ddd')} - ${date.format('DD/MM')}`;
                }
            }

            object.value = date.startOf('day').valueOf();
            allDays.push(object);
        }

        this.setState({
            allDays,
            selectedDate: allDays[0] || null
        });
    };

    checkAndSetFirstAvailableDay = async () => {
        const { allDays } = this.state;
        if (!allDays.length) return;
        for (let i = 0; i < allDays.length; i++) {
            let result = await this.fetchSchedule(allDays[i]);
            if (result.length > 0) {
                this.setState({ selectedDate: allDays[i] });
                return;
            }
        }
        this.setState({
            selectedDate: allDays[0],
            allAvailbleTime: [],
        });
    };

    fetchSchedule = async (selectedDate) => {
        if (!selectedDate || !this.props.detailDoctor || this.props.detailDoctor <= 0) return [];

        let doctorID = this.props.detailDoctor;
        let dateSelect = moment(selectedDate.value).format("YYYY-MM-DD");

        try {
            let res = await getScheduleDoctorByDate(doctorID, dateSelect);
            if (res && res.errCode === 0) {
                let data = this.filterSchedule(res.data);
                this.setState({
                    allAvailbleTime: data,
                    selectedDate: selectedDate,
                });
                return data;
            } else {
                this.setState({ allAvailbleTime: [] });
                return [];
            }
        } catch (error) {
            console.error("Lỗi lấy lịch khám:", error);
            this.setState({ allAvailbleTime: [] });
            return [];
        }
    };

    filterSchedule = (data) => {
        let { language } = this.props;
        if (data && !_.isEmpty(data)) {
            let filtered = data.filter((item) => {
                if (!item.timeTypeData) return false

                let timeStr = language === LANGUAGES.VI ? item.timeTypeData.value_VN : item.timeTypeData.value_EN
                if (!timeStr) return false
                let startTimeStr = timeStr.split('-')[0]
                let startDateTime = new Date(item.date)
                if (language === LANGUAGES.VI) {
                    let [hours, minutes] = startTimeStr.split(':').map(Number)
                    startDateTime.setHours(hours)
                    startDateTime.setMinutes(minutes)
                    startDateTime.setSeconds(0)
                } else {
                    let [times, merdians] = startTimeStr.split(' ')
                    let [hours, minutes] = times.split(':').map(Number)

                    let h = hours
                    if (merdians === 'AM' && h === 12) h = 0
                    if (merdians === 'PM' && h !== 12) h += 12

                    startDateTime.setHours(h)
                    startDateTime.setMinutes(minutes)
                    startDateTime.setSeconds(0)
                }

                return startDateTime >= new Date();
            });
            return filtered;
        }
        return [];
    };

    handleBookingSuccess = () => {
        let { selectedDate } = this.state;
        if (selectedDate) {
            this.fetchSchedule(selectedDate);
        }
    };

    handleChange = async (selectedDate) => {
        this.setState({ selectedDate });
        await this.fetchSchedule(selectedDate);
    };

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataScheduleTimeModal: time
        });
    };

    closeBookingModal = () => {
        this.setState({
            isOpenModal: false
        });
    };

    render() {
        let { allDays, allAvailbleTime, selectedDate, isOpenModal, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        const hasSelected = !!selectedDate;

        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="schedule-list">
                        <Select
                            value={selectedDate}
                            options={allDays}
                            onChange={this.handleChange}
                            className={`my-select-container ${hasSelected ? 'highlight-selected' : ''}`}
                            classNamePrefix="my-select"
                            placeholder={language === LANGUAGES.VI ? "Chọn ngày" : "Select a date"}
                        />
                    </div>
                    <div className="schedule-available-time">
                        <div className="schedule-title">
                            <span><i className='fas fa-calendar-alt'></i><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </div>
                        <div className="schedule-time">
                            {allAvailbleTime && allAvailbleTime.length > 0 ? (
                                allAvailbleTime.map((item, index) => (
                                    <button
                                        key={index}
                                        className='schedule-btn'
                                        onClick={() => this.handleClickScheduleTime(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.timeTypeData.value_VN : item.timeTypeData.value_EN}
                                    </button>
                                ))
                            ) : (
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </span>
                            )}
                        </div>
                        {allAvailbleTime && allAvailbleTime.length > 0 &&
                            <div style={{ fontStyle: "italic" }}>
                                <i className='far fa-hand-point-up choose-icon'></i>
                                <FormattedMessage id="patient.detail-doctor.order" />
                            </div>
                        }
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModal}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);