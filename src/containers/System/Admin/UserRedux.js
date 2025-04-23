import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            prevImg: '',
            isOpen: false,
            photoIndex: 0,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImg = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                prevImg: objectUrl
            })
        }
    }

    openPrevImage = () => {
        this.setState({
            isOpen: true
        })
    }

    render() {
        let genders = this.state.genderArr
        let position = this.state.positionArr
        let role = this.state.roleArr
        let language = this.props.language
        let isLoading = this.props.isLoading
        return (
            <>
                <div className="redux-container" >
                    <div className="title">
                        User redux with HuyDeliver
                    </div>
                    <div className="redux-body">
                        <div className="container">
                            <div className="row">
                                <form className="row g-3">
                                    <div className="col-12 mt-3"><FormattedMessage id="manage-user.add" /></div>
                                    <div className='col-12'>{isLoading ? 'isLoading' : ''}</div>
                                    <div className="col-md-6">
                                        <label for="email" className="form-label"><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control" name="email" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="password" className="form-label"><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control" name="password" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="firstname" className="form-label"><FormattedMessage id="manage-user.first-name" /></label>
                                        <input type="text" className="form-control" name="firstname" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="lastname" className="form-label"><FormattedMessage id="manage-user.last-name" /></label>
                                        <input type="text" className="form-control" name="lastname" />
                                    </div>
                                    <div className="col-4">
                                        <label for="Address" className="form-label"><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" className="form-control" name="address" placeholder="1234 Main St" />
                                    </div>
                                    <div className="col-4">
                                        <label for="position" className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                        <select name="position" className="form-select">
                                            {position && position.length > 0 &&
                                                position.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="phonenumber" className="form-label"><FormattedMessage id="manage-user.phone-number" /></label>
                                        <input type="text" className="form-control" name="phonenumber" />
                                    </div>
                                    <div className="col-md-4">
                                        <label for="gender" className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                        <select name="gender" className="form-select">
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="role" className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                        <select name="roleID" className="form-select">
                                            {role && role.length > 0 &&
                                                role.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="image" className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                        <div>
                                            <input type="file" id="preview-img" hidden
                                                onChange={(e) => this.handleOnchangeImg(e)}
                                            />
                                            <label className='label-img' htmlFor="preview-img">Tải ảnh <i className='fas fa-upload'></i></label>
                                            <div className="prevImg"
                                                style={{ backgroundImage: `url(${this.state.prevImg})` }}
                                                onClick={() => this.openPrevImage()}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.prevImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.position,
        roleRedux: state.admin.roles,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
