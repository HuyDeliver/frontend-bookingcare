import { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { getDoctorDefaultClass } from '../../../../services/userService';
import NumberFormat from 'react-number-format';

class DefaultClass extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);