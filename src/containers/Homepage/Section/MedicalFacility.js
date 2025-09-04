import { Component } from 'react';
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
            isLoading: true,
        };
    }
    async componentDidMount() {
        try {
            let res = await getAllClinic()
            if (res && res.errCode === 0) {
                this.setState({
                    dataClinic: res.data,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            this.setState({ isLoading: false });
        }
    }


    componentDidUpdate(prevProps) {

    }
    handleViewDetailClinic = (item) => {
        if (this.props && this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let { dataClinic, isLoading } = this.state
        return (
            <div className="medical-facility-section">
                <div className="section-container">
                    <div className="section-heading">
                        <span><FormattedMessage id='homepage.clinic' /></span>
                        <button><FormattedMessage id='homepage.more-info' /></button>
                    </div>
                    <div className="section-body">
                        {isLoading ?
                            <div>Đang tải...</div>
                            :
                            <Slider {...this.props.settings}>
                                {dataClinic && !_.isEmpty(dataClinic) > 0 &&
                                    dataClinic.map((item, index) => {
                                        return (
                                            <div className="medical-facility-item" key={item.id} onClick={() => this.handleViewDetailClinic(item)}>
                                                <div className="section-img medical-img"><img src={item.image} alt={item.name} loading="lazy" /></div>
                                                <div className="mt-2 text-center section-name">{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        }
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