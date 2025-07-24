import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailbleTime: [],
            selectedDate: null
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        await this.setArrDay(language);
        // Chỉ fetch lịch nếu detailDoctor hợp lệ
        if (this.props.detailDoctor > 0 && this.state.allDays.length > 0) {
            await this.fetchSchedule(this.state.allDays[0]);
        }
    }

    componentDidUpdate(prevProps) {
        // Kiểm tra khi language thay đổi
        if (this.props.language !== prevProps.language) {
            this.setArrDay(this.props.language);
        }
        // Kiểm tra khi detailDoctor thay đổi
        if (this.props.detailDoctor !== prevProps.detailDoctor && this.props.detailDoctor > 0) {
            if (this.state.allDays.length > 0) {
                this.fetchSchedule(this.state.allDays[0]);
            }
        }
    }

    setArrDay = async (language) => {
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

    fetchSchedule = async (selectedDate) => {
        if (!selectedDate || !this.props.detailDoctor || this.props.detailDoctor <= 0) {
            console.error('Invalid doctorID or selectedDate:', {
                doctorID: this.props.detailDoctor,
                selectedDate
            });
            this.setState({ allAvailbleTime: [] });
            return;
        }

        let doctorID = this.props.detailDoctor;
        let dateSelect = moment(selectedDate.value).format("YYYY-MM-DD");

        try {
            let res = await getScheduleDoctorByDate(doctorID, dateSelect);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailbleTime: res.data || [],
                    selectedDate
                });
            } else {
                this.setState({ allAvailbleTime: [] });
            }
        } catch (error) {
            console.error("Lỗi lấy lịch khám:", error);
            this.setState({ allAvailbleTime: [] });
        }
    };

    handleChange = async (selectedDate) => {
        this.setState({ selectedDate });
        await this.fetchSchedule(selectedDate);
    };

    render() {
        let { allDays, allAvailbleTime, selectedDate } = this.state;
        let { language } = this.props;
        const hasSelected = !!this.state.selectedDate;
        return (
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
                                <>
                                    <button key={index} className='schedule-btn'>
                                        {language === LANGUAGES.VI ? item.timeTypeData.value_VN : item.timeTypeData.value_EN}
                                    </button>
                                </>
                            ))
                        ) : (
                            <span><FormattedMessage id="patient.detail-doctor.no-schedule" /></span>
                        )}
                    </div>
                    {allAvailbleTime && allAvailbleTime.length > 0 &&
                        <div style={{ fontStyle: "italic" }}><i className='far fa-hand-point-up choose-icon'></i><FormattedMessage id="patient.detail-doctor.order" /></div>
                    }
                </div>
            </div>
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