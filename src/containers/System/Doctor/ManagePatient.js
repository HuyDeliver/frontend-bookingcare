import { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from "react-datepicker";
import { getAllPatient, sendRedemy } from '../../../services/userService'
import RemedyModal from './RemedyModal';
import { Button, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date().setHours(0, 0, 0, 0),
            dataPatient: [],
            dataModal: {},
            isOpenModal: false,
            isShowLoading: false
        };
    }

    async componentDidMount() {

        this.getDataPatient()

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentDate !== this.state.currentDate) {
            this.getDataPatient()
        }
    }
    getDataPatient = async () => {
        let { currentDate } = this.state
        let date = new Date(currentDate)
        let fixedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const finalDate = new Date(Date.UTC(
            fixedDate.getFullYear(),
            fixedDate.getMonth(),
            fixedDate.getDate()
        ));
        let { user } = this.props
        let res = await getAllPatient({
            id: user.id,
            date: finalDate.toISOString()
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    handleDateChange = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        this.setState({
            currentDate: newDate
        });
    }
    handleConfirm = (item) => {
        let data = {
            doctorID: item.doctorID,
            patientID: item.patientID,
            email: item.patientData.email,
            timeType: item.timeType,
            firstName: item.patientData.firstName,
            lastName: item.patientData.lastName
        }
        this.setState({
            dataModal: data,
            isOpenModal: true
        })
    }

    closeRedemyModal = () => {
        this.setState({
            dataModal: {},
            isOpenModal: false
        })
    }
    sendRedemy = async (data) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await sendRedemy({
            doctorID: dataModal.doctorID,
            patientID: dataModal.patientID,
            email: data.email,
            image: data.image,
            timeType: dataModal.timeType,
            language: this.props.language,
            firstName: dataModal.firstName,
            lastName: dataModal.lastName
        })
        if (res && res.errCode === 0) {
            toast.success('Confirm success')
            this.setState({
                isOpenModal: false,
                isShowLoading: false
            })
            this.getDataPatient()
        } else {
            toast.error('Somethign went wrong !!')
        }
    }
    render() {
        let { dataPatient, dataModal, isOpenModal, isShowLoading } = this.state
        return (
            <>
                < div className="manage-patient-container" >
                    <div className="container">
                        <div className="row">
                            <div className="m-p-title col-12 text-center mt-4 mb-5">
                                Quản lý bệnh nhân
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor=""><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    onChange={this.handleDateChange}
                                    className="form-control mt-3 mb-3"
                                    selected={this.state.currentDate}
                                />
                            </div>
                            <Table
                                hover
                                responsive
                                className='text-center align-middle mt-4 mb-4'
                            >
                                <thead>
                                    <tr>
                                        <th scope="row">STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và Tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Lí do khám</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {item.timeTypeDataPatient.value_VN}
                                                    </td>
                                                    <td>
                                                        {item.patientData.lastName}{item.patientData.firstName}
                                                    </td>
                                                    <td>
                                                        {item.birthday}
                                                    </td>
                                                    <td>
                                                        {item.patientData.genderData.value_VN}
                                                    </td>
                                                    <td>
                                                        {item.reason}
                                                    </td>
                                                    <td className="text-center">
                                                        <Button
                                                            onClick={() => this.handleConfirm(item)}
                                                            color="info"
                                                            outline>
                                                            Xác nhận
                                                        </Button>
                                                    </td>
                                                </tr >
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan='7'>No user</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <Loading
                    show={isShowLoading}
                />
                <RemedyModal
                    isOpenModal={isOpenModal}
                    dataModal={dataModal}
                    closeRedemyModal={this.closeRedemyModal}
                    sendRedemy={this.sendRedemy}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);