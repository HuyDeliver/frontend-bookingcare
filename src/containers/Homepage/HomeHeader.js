import { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import khamchuyenkhoa from '../../assets/images/khamchuyenkhoa.png';
import khamtuxa from '../../assets/images/khamtuxa.png';
import khamtongquat from '../../assets/images/khamtongquat.png';
import dichvuxetnghiem from '../../assets/images/dichvuxetnghiem.png';
import suckhoetinhthan from '../../assets/images/suckhoetinhthan.png';
import khamnhakhoa from '../../assets/images/khamnhakhoa.png';
import Select, { components } from 'react-select';
import { searchBar } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChangelang: false,
            options: [],
            error: null,
            isLoading: false
        };

        // this.searchTimeout = null;
        this.performSearch = this.performSearch.bind(this)
        this.debounceSearch = _.debounce(this.performSearch, 300);
    }


    // Cleanup timeout khi component unmount
    componentWillUnmount() {
        this.debounceSearch.cancel();
    }

    handleChangeLang = () => {
        this.setState({
            isChangelang: !this.state.isChangelang
        });
    };

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    handlereturnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    // Debounce search để tránh gọi API liên tục
    handleInputChange = (inputValue, { action }) => {
        if (action !== 'input-change') return

        if (inputValue && inputValue.trim().length) {
            this.setState({
                isLoading: true,
                error: null
            })
            this.debounceSearch(inputValue.trim())
        } else {
            this.setState({
                options: [],
                error: null,
                isLoading: false
            });
        }
    };

    // Tách riêng hàm search
    performSearch = async (searchTerm) => {
        try {
            let res = await searchBar(searchTerm)
            if (res && res.errCode === 0) {
                let data = res.results.map(item => ({
                    value: item.id,
                    label: item.name_kq,
                    type: item.type,
                    image: item.image_url,
                }));
                if (data) {
                    data.filter(Boolean)
                }
                this.setState({
                    options: data,
                    isLoading: false,
                })

            }
        } catch (error) {
            console.log(error)
            this.setState({
                options: [],
                error: 'Lỗi kết nối, vui lòng thử lại',
                isLoading: false
            })
        }
    };

    handleSelectChange = (selected) => {
        if (selected && this.props) {
            this.props.history.push(`/detail-${selected.type}/${selected.value}`)
        }
    };

    render() {
        // Custom Option với error handling
        const CustomOption = ({ data, ...props }) => {
            if (!data) return null;

            return (
                <components.Option {...props}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {data.image && (
                            <img
                                src={data.image}
                                alt={data.label || 'Không có tên'}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 6,
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        <span>{data.label || 'Không có tên'}</span>
                    </div>
                </components.Option>
            );
        };

        const NoOptionsMessage = ({ inputValue }) => (
            <div style={{ padding: '8px 12px', textAlign: 'center' }}>
                {this.state.error || (inputValue ? 'Không tìm thấy kết quả' : 'Nhập để tìm kiếm')}
            </div>
        );

        const customStyles = {
            control: (styles, { isFocused }) => ({
                ...styles,
                backgroundColor: '#f7d800',
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                    border: 'none',
                },
                minHeight: '40px',
                cursor: 'text',
            }),
            option: (styles, { isFocused, isSelected }) => ({
                ...styles,
                backgroundColor: isFocused ? '#f7d800' : 'white',
                color: 'black',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#f7d800',
                }
            }),
            container: (styles) => ({
                ...styles,
                width: '300px'
            }),
            singleValue: (styles) => ({
                ...styles,
                color: 'black',
            }),
            placeholder: (styles) => ({
                ...styles,
                color: 'gray',
            }),
            dropdownIndicator: (styles) => ({
                ...styles,
                display: 'none',
            }),
            indicatorSeparator: (styles) => ({
                ...styles,
                display: 'none',
            }),
            menu: (styles) => ({
                ...styles,
                marginTop: 0,
                zIndex: 9999
            }),
            menuList: (styles) => ({
                ...styles,
                maxHeight: '200px'
            })
        };

        let language = this.props.language;

        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo" onClick={() => this.handlereturnToHome()}></div>
                        </div>
                        <div className="center-content">
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.speciality" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.health-facility" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.Doctor" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='menu-title'><FormattedMessage id="homeheader.fee" /></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="menu-lang"
                                onClick={() => {
                                    this.changeLanguage(language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI);
                                }}
                            >
                                {language === LANGUAGES.VI ? 'VN' : 'EN'}
                            </div>
                            <div className="menu-support">
                                <i className='fas fa-question-circle'></i>
                                <FormattedMessage id="homeheader.help" />
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowbanner === true && (
                    <div className="home-header-slider">
                        <div className="slider-title">
                            <h1><FormattedMessage id="slider.medical-background" /></h1>
                            <h2><FormattedMessage id="slider.comprehensive-care" /></h2>
                        </div>
                        <div className="slider-search">
                            <i className='fas fa-search'></i>
                            <Select
                                onInputChange={this.handleInputChange}
                                onChange={this.handleSelectChange}
                                styles={customStyles}
                                placeholder={'Tìm bác sĩ, chuyên khoa, bệnh viện...'}
                                components={{
                                    Option: CustomOption,
                                    NoOptionsMessage
                                }}
                                options={this.state.options}
                                isLoading={this.state.isLoading}
                                loadingMessage={() => "Đang tìm kiếm..."}
                                noOptionsMessage={NoOptionsMessage}
                                isClearable
                                isSearchable
                                cacheOptions={false}
                            />
                        </div>
                        <div className="slider-option">
                            <div className='option-menu'>
                                <div className='option-img'>
                                    <img src={khamchuyenkhoa} alt="" />
                                </div>
                                <div>
                                    <h4><FormattedMessage id="slider.specialist-exam" /></h4>
                                </div>
                            </div>
                            <div className='option-menu'>
                                <div className='option-img'><img src={khamtuxa} alt="" /></div>
                                <div><h4><FormattedMessage id="slider.telemedicine" /></h4></div>
                            </div>
                            <div className='option-menu'>
                                <div className='option-img'><img src={khamtongquat} alt="" /></div>
                                <div><h4><FormattedMessage id="slider.general-exam" /></h4></div>
                            </div>
                            <div className='option-menu'>
                                <div className='option-img'><img src={dichvuxetnghiem} alt="" /></div>
                                <div><h4><FormattedMessage id="slider.medical-test" /></h4></div>
                            </div>
                            <div className='option-menu'>
                                <div className='option-img'><img src={suckhoetinhthan} alt="" /></div>
                                <div><h4><FormattedMessage id="slider.mental-health" /></h4></div>
                            </div>
                            <div className='option-menu'>
                                <div className='option-img'><img src={khamnhakhoa} alt="" /></div>
                                <div><h4><FormattedMessage id="slider.dental-checkup" /></h4></div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));