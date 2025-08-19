import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {


    }

    componentDidUpdate(prevProps) {

    }

    render() {

        return (
           
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);