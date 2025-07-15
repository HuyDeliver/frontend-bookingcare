import React from 'react';
import { Redirect } from 'react-router-dom';

const RouteProtection = ({ allowedRoles, userRole, children }) => {
    // Nếu user role không được phép truy cập route này
    if (!allowedRoles.includes(userRole)) {
        // Redirect về trang chính của role đó
        switch (userRole) {
            case 'R1': // ADMIN
                return <Redirect to="/system/user-manage" />;
            case 'R2': // DOCTOR  
                return <Redirect to="/system/manage-schedule" />;
            case 'R3': // PATIENT
                return <Redirect to="/" />;
            default:
                return <Redirect to="/login" />;
        }
    }

    // Nếu có quyền, render children
    return children;
};

export default RouteProtection;