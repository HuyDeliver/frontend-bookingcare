import { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import { saveDoctorScheduleService } from '../../../services/userService';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: '',
            currentDate: new Date().setHours(0, 0, 0, 0),
            rangeTime: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchAllScheduleHourStart()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.scheduleTimes !== this.props.scheduleTimes) {
            let data = this.props.scheduleTimes
            if (data && data.length > 0) {
                data = data.map((item) => ({
                    ...item, isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    builDataInputSelect = (inputData) => {
        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let lableVi = `${item.lastName} ${item.firstName}`
                let lableEn = `${item.firstName} ${item.lastName} `
                object.label = language === LANGUAGES.VI ? lableVi : lableEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    };
    handleDateChange = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        this.setState({
            currentDate: newDate
        });
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveInfo = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let date = new Date(currentDate);

        // Tạo date ở đúng 00:00 giờ Việt Nam (UTC+7)
        let fixedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        // Convert về UTC trước khi gửi
        const finalDate = new Date(Date.UTC(
            fixedDate.getFullYear(),
            fixedDate.getMonth(),
            fixedDate.getDate()
        ));
        let result = []
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item) => {
                    let object = {}
                    object.doctorID = selectedDoctor.value
                    object.date = finalDate
                    object.timeType = item.key
                    result.push(object)
                })
            } else {
                toast.error('Invalide selected time')
                return
            }
        }
        let res = await saveDoctorScheduleService({
            arrSchedule: result,
            doctorID: selectedDoctor.value,
            date: finalDate
        })
        if (res && res.errCode === 0) {
            toast.success('Lưu thành công');

            let resetRangeTime = this.state.rangeTime.map(item => ({
                ...item,
                isSelected: false
            }));

            this.setState({
                selectedDoctor: '',
                currentDate: new Date().setHours(0, 0, 0, 0),
                rangeTime: resetRangeTime
            });
        } else {
            toast.error(res.errMessage);
        }
    }
    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <>
                < div className="manage-schedule-container" >
                    <div className="container">
                        <div className="row">
                            <div className="m-s-title col-12 text-center mt-4 mb-5">
                                <FormattedMessage id="manage-schedule.title" />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    className="mt-3 mb-3"
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    onChange={this.handleDateChange}
                                    className="form-control mt-3 mb-3"
                                    selected={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour mt-3 d-flex justify-content-between flex-grow-1 flex-shrink-1">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                onClick={() => this.handleClickBtnTime(item)}
                                                className={item.isSelected === true ? "btn btn-outline-secondary mr-2 active" : "btn btn-outline-secondary mr-2"} key={index}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</button>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-3 mt-4">
                                <button type='submit'
                                    onClick={() => this.handleSaveInfo()}
                                    className='btn btn-primary'><FormattedMessage id="manage-schedule.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        scheduleTimes: state.admin.scheduleTimes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHourStart: () => dispatch(actions.fetchAllScheduleHourStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
