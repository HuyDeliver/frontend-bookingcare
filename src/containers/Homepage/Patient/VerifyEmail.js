import { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyEmailBooking } from '../../../services/userService';
import HomeHeader from '../HomeHeader';
import './VerifyEmail.scss';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: '',
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let URLParams = new URLSearchParams(this.props.location.search);
            let token = URLParams.get('token');
            let doctorID = URLParams.get('doctorID');

            // Kiểm tra thiếu param
            if (!token || !doctorID) {
                this.setState({
                    statusVerify: true,
                    errCode: -1
                });
                return;
            }

            try {
                let res = await postVerifyEmailBooking({ token, doctorID });

                if (res && res.errCode === 0) {
                    this.setState({ statusVerify: true, errCode: 0 });

                    // Chuyển hướng về trang chủ sau 3s
                    setTimeout(() => {
                        this.props?.history.push(`/home`);
                    }, 3000);
                } else {
                    this.setState({ statusVerify: true, errCode: res?.errCode ?? -1 });
                }
            } catch (error) {
                console.error("Verify booking error:", error);
                this.setState({ statusVerify: true, errCode: -1 });
            }
        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-container">
                    {statusVerify === false ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <div className={`verify-message ${errCode === 0 ? 'success' : 'error'}`}>
                            {errCode === 0 ? (
                                <>
                                    Xác nhận lịch hẹn thành công!
                                    <div className="redirect-msg">Bạn sẽ được chuyển về trang chủ...</div>
                                </>
                            ) : (
                                <>
                                    Lịch hẹn không tồn tại hoặc đã được xác nhận trước đó.
                                </>
                            )}
                        </div>
                    )}
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

export default withRouter(connect(mapStateToProps)(VerifyEmail));
