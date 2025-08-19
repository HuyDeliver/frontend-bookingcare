import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomeHeader';
import HomeFooter from '../../HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import './DetailSpecialty.scss'
import BookingInfor from '../Doctor/BookingInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialty } from '../../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            detailSpecialty: {},
            isExpand: false,
            selectedProvince: '',
            listProvinces: []
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialty({
                id: id,
                location: 'ALL'
            })
            if (res && res.errCode === 0) {
                let doctorID = []
                let data = res.data
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            doctorID.push(item.doctorID)
                        })
                    }
                }
                this.setState({
                    detailSpecialty: res.data,
                    arrDoctorId: doctorID
                })
            }
        }
        this.props.fetchProvinceDoctor()

    }
    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.province !== prevProps.province) {
            this.setState({
                listProvinces: this.buildDataSelect(this.props.province),
                selectedProvince: this.buildDataSelect(this.props.province)[0]
            })
        }
    }
    buildDataSelect = (inputData) => {
        let result = []
        let clone = [...inputData]
        clone.unshift({
            key: "ALL",
            type: "PROVINCE",
            value_EN: "NationWide",
            value_VN: "Toàn quốc"
        })
        let language = this.props.language
        if (clone && clone.length > 0) {
            clone.map((item) => {
                let object = {}
                let labelVI = item.value_VN
                let labelEN = item.value_EN
                object.label = language === LANGUAGES.VI ? labelVI : labelEN
                object.value = item.key
                result.push(object)
            })
        }
        return result
    }

    handleToggleDescription = () => {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    handleChange = (selectedProvince) => {
        this.setState({ selectedProvince })

        let { detailSpecialty } = this.state
        if (detailSpecialty && !_.isEmpty(detailSpecialty)) {
            let id = []
            let doctorProvince = detailSpecialty.doctorSpecialty
            let filter = []
            if (selectedProvince.value === 'ALL') {
                filter = doctorProvince
            } else {
                filter = doctorProvince.filter((item) => {
                    return item.provinceId === selectedProvince.value
                })
            }
            filter.map((item) => {
                id.push(item.doctorID)
            })
            this.setState({
                arrDoctorId: id
            })
        }
    }

    render() {
        const customStyles = {
            option: (styles, state) => ({
                ...styles,
                cursor: 'pointer',
            }),
            control: (styles) => ({
                ...styles,
                cursor: 'pointer',
            })
        }
        let { arrDoctorId, detailSpecialty, isExpand } = this.state
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">
                    <div className="detail-specialty">
                        <div className="specialty-bg">
                        </div>
                        {detailSpecialty && detailSpecialty.descriptionHTML && detailSpecialty.image &&
                            <div
                                className={`specialty-image ${isExpand ? 'expanded' : 'collapsed'}`}
                                style={{ backgroundImage: `url(${detailSpecialty.image})` }}
                            >
                                <div className="desciption-specialty">
                                    <div className="title-specialty mb-2">{detailSpecialty.name}</div>
                                    <div
                                        className={`text-specialty ${isExpand ? 'expandedText' : 'collapsedText'}`}
                                        dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}
                                    ></div>

                                    <div
                                        className='hide-or-show'
                                        onClick={this.handleToggleDescription}
                                    >
                                        {isExpand ? 'Ẩn bớt' : 'Xem thêm'}
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                    <div className={arrDoctorId && arrDoctorId.length > 0 ? "doctor-with-specialty" : "doctor-with-specialty no-doctor-found"}>
                        <div className="container pb-3">
                            <div className="row pt-3 pb-3">
                                <Select
                                    styles={customStyles}
                                    className='col-sm-2 p-1 me-1'
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChange}
                                    options={this.state.listProvinces}
                                />
                            </div>
                            {arrDoctorId && arrDoctorId.length > 0 ?
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
                                :
                                <div className='text-center'>Ko tìm thấy bác sĩ nào trong khu vực này </div>
                            }
                        </div>
                    </div>
                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);