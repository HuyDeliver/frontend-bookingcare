import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';

import {
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Row, Col, Button,
    ModalFooter
} from 'reactstrap';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import * as actions from '../../../../store/actions'
import { postPatientBooking } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { emitter } from '../../../../utils/emitter';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            gender: [],
            price: '',
            birthdayDate: '',
            selectedGender: '',
            doctorID: '',
            timeType: '',
            patientName: '',
            dateBooking: ''
        };
    }

    componentDidMount() {
        this.props.getGenderStart()
    }


    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                gender: this.builDataSelect(this.props.genderRedux)
            })
        }

        if (this.props.genderRedux !== prevProps.genderRedux) {
            this.setState({
                gender: this.builDataSelect(this.props.genderRedux)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            this.setState({
                doctorID: this.props.dataTime.doctorID,
                timeType: this.props.dataTime.timeType,
                dateBooking: this.props.dataTime.date
            })
        }
    }
    toggleModal = () => {
        if (this.props.closeBookingModal) {
            this.props.closeBookingModal();
        }
    };
    DoctorInfor = (priceData) => {
        this.setState({
            price: priceData
        })
    }
    handleDateChange = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        this.setState({
            birthdayDate: date
        });
    }

    builDataSelect = (data) => {
        let { language } = this.props
        let result = []
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.value_VN : item.value_EN
                object.value = item.key
                result.push(object)
            })
        }
        return result

    }
    handleChange = (selectedGender) => {
        this.setState({ selectedGender })
    }
    checkValidateInput = () => {
        let isValid = true
        let arrValid = ['email', 'patientName', 'phoneNumber', 'address']
        for (let i = 0; i < arrValid.length; i++) {
            if (!this.state[arrValid[i]]) {
                isValid = false
                alert('Missing parameter ' + arrValid[i])
                break
            }
        }
        return isValid
    }
    handleOnchange = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }
    handleSaveInfor = async () => {
        let Valid = this.checkValidateInput()
        if (Valid === false) {
            return
        }
        let res = await postPatientBooking({
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            patientName: this.state.patientName,
            price: this.state.price,
            birthdayDate: this.state.birthdayDate,
            selectedGender: this.state.selectedGender.value,
            doctorID: this.state.doctorID,
            timeType: this.state.timeType,
            language: this.props.language,
            dateBooking: this.state.dateBooking,
            doctorName: this.builDatanameDoctor()
        })
        if (res && res.errCode === 0) {
            toast.success('Đặt lịch khám bệnh thành công')
            this.toggleModal();
            emitter.emit('BOOKING_SUCCESS')
        } else {
            toast.error(res.errMessage)
        }

    }
    builDatanameDoctor = () => {
        let { language, dataTime } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }
    render() {
        let { isOpenModal, dataTime, language } = this.props
        let { price } = this.state
        let doctorID = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorID = dataTime.doctorID
        }
        return (
            <Modal isOpen={isOpenModal} className='booking-modal-container' size='lg' centered>
                <div className="modal-header d-flex justify-content-between align-items-center">
                    <h5 className="modal-title mb-0"><FormattedMessage id='patient.booking-modal.title' /></h5>
                    <i
                        className="fas fa-times close-icon"
                        onClick={this.toggleModal}
                        style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                    ></i>
                </div>
                <ModalBody>
                    <div className='booking-form'>
                        <div className="booking-doctor-info">
                            <ProfileDoctor
                                doctorID={doctorID}
                                dataTime={dataTime}
                                isShowDs={false}
                            />
                        </div>
                        <Form>
                            <Row className='mb-3'>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'><FormattedMessage id='patient.booking-modal.fullName' /></Label>
                                        <Input
                                            onChange={(e) => this.handleOnchange(e, 'patientName')}
                                            type="text" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'><FormattedMessage id='patient.booking-modal.phone-number' /></Label>
                                        <Input
                                            onChange={(e) => this.handleOnchange(e, 'phoneNumber')}
                                            type="tel" />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'><FormattedMessage id='patient.booking-modal.email' /></Label>
                                        <Input
                                            onChange={(e) => this.handleOnchange(e, 'email')}
                                            type="email" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'><FormattedMessage id='patient.booking-modal.address' /></Label>
                                        <Input
                                            onChange={(e) => this.handleOnchange(e, 'address')}
                                            type="text" />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup className='mb-3'>
                                <Label className='mb-1'><FormattedMessage id='patient.booking-modal.reason' /></Label>
                                <Input
                                    onChange={(e) => this.handleOnchange(e, 'reason')}
                                    type="text" />
                            </FormGroup>

                            <Row className='mb-3'>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'><FormattedMessage id='patient.booking-modal.birthday' /></Label>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            onChange={this.handleDateChange}
                                            className="form-control"
                                            selected={this.state.birthdayDate}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className='mb-1'><FormattedMessage id='patient.booking-modal.gender' /></Label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChange}
                                            options={this.state.gender}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='form-buttons d-flex justify-content-end mt-3'>
                        <Button color='warning' className='me-2' onClick={() => this.handleSaveInfor()}><FormattedMessage id='patient.booking-modal.save' /></Button>
                        <Button color='secondary'><FormattedMessage id='patient.booking-modal.cancel' /></Button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
