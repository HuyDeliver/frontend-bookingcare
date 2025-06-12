import React, { Component } from 'react';
import { connect } from "react-redux";


class ManageSchedule extends Component {
    render() {
        return (
            <>
                < div className="" >
                    hello manage schedule
                </div >
            </>

        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
