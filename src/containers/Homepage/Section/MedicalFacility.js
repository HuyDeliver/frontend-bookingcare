import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from '../../../services/userService';
import _ from 'lodash';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }

    componentDidUpdate(prevProps) {

    }
    handleViewDetailClinic = (item) => {
        if (this.props && this.props.history) {
            console.log("check", this.props)
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let { dataClinic } = this.state
        return (
            <div className="medical-facility-section">
                <div className="section-container">
                    <div className="section-heading">
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic && !_.isEmpty(dataClinic) &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className="medical-facility-item" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className="section-img medical-img"><img src={item.image} alt="" /></div>
                                            <div className="mt-2 text-center section-name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));