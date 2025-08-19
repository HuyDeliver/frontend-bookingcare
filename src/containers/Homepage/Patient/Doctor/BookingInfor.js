import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingInfor.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { getDoctorBookingInfor } from '../../../../services/userService';
import NumberFormat from 'react-number-format';

class BookingInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingInfor: [],
            isShowDetail: false,
        };
    }

    async componentDidMount() {
        if (this.props.detailDoctor > 0) {
            this.fetchBookingInforDoctor(this.props.detailDoctor)
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.detailDoctor !== prevProps.detailDoctor && this.props.detailDoctor > 0) {
            this.fetchBookingInforDoctor(this.props.detailDoctor)
        }
    }
    fetchBookingInforDoctor = async (id) => {
        if (!id || id <= 0) {
            console.error('Invalid doctorID:', {
                doctorID: id,
            });
        }
        let doctorID = id;
        try {
            let res = await getDoctorBookingInfor(doctorID);
            if (res && res.errCode === 0) {
                this.setState({
                    bookingInfor: res.data
                })
            }
        } catch (error) {
            console.error("Lỗi lấy id doctor:", error);
        }
    }
    handleShowDetailPrice = (status) => {
        this.setState({
            isShowDetail: status
        })
    }
    getPaymentText = (valueVN, language) => {
        const paymentTranslations = {
            'Tiền mặt': 'Cash',
            'Thẻ ATM': 'ATM card',
            'Tất cả': 'cash or ATM card',
        };

        // Nếu là tiếng Việt
        if (language === LANGUAGES.VI) {
            if (valueVN === 'Tất cả') {
                return 'tiền mặt hoặc thẻ ATM';
            }
            return this.lowercaseFirstLetter(valueVN);
        }

        // Nếu là tiếng Anh
        return paymentTranslations[valueVN] || 'N/A';
    }

    lowercaseFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    render() {
        let { isShowDetail, bookingInfor } = this.state
        let { language } = this.props
        return (
            <div className="Doctor-booking-info">
                <div className="Doctor-booking-adress">
                    <div className='Doctor-address-title mb-1'><FormattedMessage id="patient.booking-infor.clinicAddress" /></div>
                    <div className='Doctor-clinic mb-1'>{bookingInfor && bookingInfor.nameClinic ? bookingInfor.nameClinic : ''}</div>
                    <div className='Doctor-address mb-2'>{bookingInfor && bookingInfor.addressClinic ? bookingInfor.addressClinic : ''}</div>
                </div>
                <div className={isShowDetail === false ? "Doctor-booking-price d-flex align-items-center" : "Doctor-booking-price"}>
                    <div className='Doctor-price-title mt-2 mb-2 me-1'>
                        <FormattedMessage id="patient.booking-infor.price" />
                    </div>
                    <div>{isShowDetail === false ?
                        <div className="Doctor-price">
                            <div>
                                {bookingInfor && bookingInfor.priceData && language === LANGUAGES.VI ?
                                    <NumberFormat
                                        value={bookingInfor?.priceData?.value_VN}
                                        displayType='text'
                                        thousandSeparator={true}
                                        renderText={(value) => (
                                            <span>
                                                {value}<sup>đ</sup>
                                            </span>
                                        )}
                                    />
                                    :
                                    <NumberFormat
                                        value={bookingInfor?.priceData?.value_EN}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix='$'
                                    />
                                }
                                . <span className='hide-and-show' onClick={() => this.handleShowDetailPrice(true)} ><FormattedMessage id="patient.booking-infor.show" /></span></div>
                        </div>
                        :
                        <>
                            <div className="Doctor-price-detail">
                                <div className='Doctor-price-up'>
                                    <div className='d-flex justify-content-between'>
                                        <div><FormattedMessage id="patient.booking-infor.price" /><div className='note'>{bookingInfor && bookingInfor.note ? bookingInfor.note : ''}</div></div>
                                        <div> {bookingInfor && bookingInfor.priceData && language === LANGUAGES.VI ?
                                            <NumberFormat
                                                value={bookingInfor?.priceData?.value_VN}
                                                displayType='text'
                                                thousandSeparator={true}
                                                renderText={(value) => (
                                                    <span>
                                                        {value}<sup>đ</sup>
                                                    </span>
                                                )}
                                            />
                                            :
                                            <NumberFormat
                                                value={bookingInfor?.priceData?.value_EN}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix='$'
                                            />
                                        }</div>
                                    </div>
                                </div>
                                <div className='Doctor-price-down'><FormattedMessage id="patient.booking-infor.payment" />&nbsp;
                                    {bookingInfor && bookingInfor.paymentData &&
                                        this.getPaymentText(bookingInfor.paymentData.value_VN, language)
                                    }
                                </div>
                            </div>
                            <span className='hide-and-show' onClick={() => this.handleShowDetailPrice(false)}><FormattedMessage id="patient.booking-infor.hide" /></span>
                        </>

                    }</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingInfor);