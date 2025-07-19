import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
// import ManageClinic from '../containers/System/Admin/ManageClinic';
// import ManageSpecialty from '../containers/System/Admin/ManageSpecialty';
// import ManageHandbook from '../containers/System/Admin/ManageHandbook';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import RouteProtection from './RouteProtection';
import _ from 'lodash';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { USER_ROLE } from '../utils';

class System extends Component {
    componentDidMount() {
        this.checkUserPermission();
    }

    componentDidUpdate(prevProps) {
        // Kiểm tra lại quyền khi userInfo thay đổi
        if (prevProps.userInfo !== this.props.userInfo) {
            this.checkUserPermission();
        }
    }

    checkUserPermission = () => {
        const { userInfo, isLoggedIn } = this.props;

        // Nếu chưa đăng nhập
        if (!isLoggedIn) {
            console.log('System - User not logged in, redirecting to login');
            this.props.history.push('/login');
            return;
        }

        // Nếu không có thông tin user hoặc userInfo rỗng
        if (!userInfo || _.isEmpty(userInfo)) {
            console.log('System - No user info, redirecting to login');
            this.props.history.push('/login');
            return;
        }

        const { roleID } = userInfo;
        console.log('System - User role:', roleID);

        // Nếu không có role
        if (!roleID) {
            console.log('System - No role found, redirecting to login');
            this.props.history.push('/login');
            return;
        }

        // Nếu là patient, không được vào system
        if (roleID === USER_ROLE.PATIENT) {
            console.log('System - Patient role, redirecting to home');
            this.props.history.push('/');
            return;
        }

        // Chỉ ADMIN và DOCTOR mới được vào system
        if (roleID !== USER_ROLE.ADMIN && roleID !== USER_ROLE.DOCTOR) {
            console.log('System - Invalid role for system access, redirecting to home');
            this.props.history.push('/');
            return;
        }

        console.log('System - Permission check passed for role:', roleID);
    }

    render() {
        const { systemMenuPath, isLoggedIn, userInfo } = this.props;

        // Nếu chưa đăng nhập hoặc không có userInfo, không render gì
        if (!isLoggedIn || !userInfo || _.isEmpty(userInfo)) {
            return null;
        }

        const { roleID } = userInfo;

        return (
            <>
                <Header />
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* Routes cho ADMIN - với protection */}
                            <Route path="/system/user-manage" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN]} userRole={roleID}>
                                    <UserManage />
                                </RouteProtection>
                            )} />
                            <Route path="/system/user-redux" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN]} userRole={roleID}>
                                    <UserRedux />
                                </RouteProtection>
                            )} />
                            <Route path="/system/manage-doctor" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN]} userRole={roleID}>
                                    <ManageDoctor />
                                </RouteProtection>
                            )} />
                            {/* <Route path="/system/manage-clinic" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN]} userRole={roleID}>
                                    <ManageClinic />
                                </RouteProtection>
                            )} />
                            <Route path="/system/manage-specialty" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN]} userRole={roleID}>
                                    <ManageSpecialty />
                                </RouteProtection>
                            )} />
                            <Route path="/system/manage-handbook" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN]} userRole={roleID}>
                                    <ManageHandbook />
                                </RouteProtection>
                            )} /> */}

                            {/* Route cho cả ADMIN và DOCTOR */}
                            <Route path="/system/manage-schedule" render={() => (
                                <RouteProtection allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.DOCTOR]} userRole={roleID}>
                                    <ManageSchedule />
                                </RouteProtection>
                            )} />

                            {/* Default redirect based on role */}
                            {roleID === USER_ROLE.ADMIN && (
                                <Route exact path="/system" render={() => <Redirect to="/system/user-manage" />} />
                            )}
                            {roleID === USER_ROLE.DOCTOR && (
                                <Route exact path="/system" render={() => <Redirect to="/system/manage-schedule" />} />
                            )}
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));