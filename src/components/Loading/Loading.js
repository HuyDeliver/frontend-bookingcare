import React, { Component } from 'react';
import { connect } from "react-redux";
import { Spinner } from 'reactstrap';
import './Loading.scss'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        let { show } = this.props
        return (
            <>
                {show === true &&
                    <div className="overlay-loading">
                        <div className='spinner-loading'>
                            <Spinner color="info" >
                            </Spinner>
                            <p>Loading...</p>
                        </div>
                    </div>
                }
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);