import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomeHeader.scss'

class HomePage extends Component {

    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <div className="header-logo">
                        </div>
                    </div>
                    <div className="center-content">
                        <div className='child-content'>
                            <div className='menu-title'><b>Chuyên khoa</b></div>
                            <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className='child-content'>
                            <div className='menu-title'><b>Cơ sở y tế</b></div>
                            <div className='subs-title'>Chọn bệnh viên phòng khám</div>
                        </div>
                        <div className='child-content'>
                            <div className='menu-title'><b>Bác sĩ</b></div>
                            <div className='subs-title'>Chọn bác sĩ giỏi</div>
                        </div>
                        <div className='child-content'>
                            <div className='menu-title'><b>Gói khám</b></div>
                            <div className='subs-title'>Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="menu-support">
                            <i className='fas fa-question-circle'></i>
                            Hỗ trợ
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
