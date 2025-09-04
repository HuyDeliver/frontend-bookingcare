import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllSpecialty } from '../../../services/userService';
import '../HomePage.scss';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            isLoading: true,
        };
    }
    async componentDidMount() {
        try {
            let res = await getAllSpecialty();
            this.setState({
                dataSpecialty: res.errCode === 0 ? res.data || [] : [],
                isLoading: false,
            });
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            this.setState({ isLoading: false });
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    };

    render() {
        const { dataSpecialty, isLoading } = this.state;
        return (
            <div className="specialty-section section-bg">
                <div className="section-container">
                    <div className="section-heading">
                        <span><FormattedMessage id="homepage.specialty" /></span>
                        <button>
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        {isLoading ? (
                            <div>Đang tải...</div>
                        ) : (
                            <Slider {...this.props.settings}>
                                {dataSpecialty.map((item) => (
                                    <div
                                        className="specialty-item"
                                        key={item.id}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                        onKeyDown={(e) => e.key === 'Enter' && this.handleViewDetailSpecialty(item)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="section-img specialty-img">
                                            <img loading="lazy" src={item.image} alt={item.name} />
                                        </div>
                                        <div className="mt-2 text-center section-name">{item.name}</div>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default withRouter(connect(mapStateToProps)(Specialty));