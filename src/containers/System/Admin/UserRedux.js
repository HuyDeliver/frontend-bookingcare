import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './tableManageUser';
import { stringify } from 'react-auth-wrapper/helpers';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            prevImg: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditid: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                prevImg: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnchangeImg = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                prevImg: objectUrl,
                avatar: base64
            })
        }
    }

    openPrevImage = () => {
        this.setState({
            isOpen: true
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrValid = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrValid.length; i++) {
            if (!this.state[arrValid[i]]) {
                isValid = false
                alert('Missing parameter ' + arrValid[i])
                break
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) {
            return
        }
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleID: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAUser({
                id: this.state.userEditid,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleID: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }

    }
    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    editUserInput = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionID,
            role: user.roleID,
            prevImg: imageBase64,
            avatar: '',
            userEditid: user.id,
            action: CRUD_ACTIONS.EDIT
        })
    }

    backToCreateUser = () => {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            prevImg: '',
            action: CRUD_ACTIONS.CREATE
        })
    }

    render() {
        let genderform = this.state.genderArr
        let positionform = this.state.positionArr
        let roleform = this.state.roleArr
        let language = this.props.language
        let isLoading = this.props.isLoading
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state

        return (
            <>
                <div className="redux-container" >
                    <div className="title">
                        User redux with HuyDeliver
                    </div>
                    <div className="redux-body">
                        <div className="container">
                            <div className="row">
                                <form className="row gy-3">
                                    <div className="col-12 mt-3"><FormattedMessage id="manage-user.add" /></div>
                                    <div className='col-12'>{isLoading ? 'isLoading' : ''}</div>
                                    <div className="col-md-6">
                                        <label for="email" className="form-label"><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control" name="email"
                                            onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                            value={email}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="password" className="form-label"><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control" name="password"
                                            onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                            value={password}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="firstname" className="form-label"><FormattedMessage id="manage-user.first-name" /></label>
                                        <input type="text" className="form-control" name="firstName"
                                            onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                            value={firstName}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="lastname" className="form-label"><FormattedMessage id="manage-user.last-name" /></label>
                                        <input type="text" className="form-control" name="lastName"
                                            onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                            value={lastName}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label for="Address" className="form-label"><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" className="form-control" name="address" placeholder="1234 Main St"
                                            onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                            value={address}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label for="position" className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                        <select name="position" className="form-select"
                                            onChange={(e) => this.handleOnchangeInput(e, 'position')}
                                            value={position}
                                        >
                                            {positionform && positionform.length > 0 &&
                                                positionform.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="phonenumber" className="form-label"><FormattedMessage id="manage-user.phone-number" /></label>
                                        <input type="text" className="form-control" name="phoneNumber"
                                            onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                            value={phoneNumber}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label for="gender" className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                        <select name="gender" className="form-select"
                                            onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                            value={gender}
                                        >
                                            {genderform && genderform.length > 0 &&
                                                genderform.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="role" className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                        <select name="role" className="form-select"
                                            onChange={(e) => this.handleOnchangeInput(e, 'role')}
                                            value={role}
                                        >
                                            {roleform && roleform.length > 0 &&
                                                roleform.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.value_VN : item.value_EN}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="image" className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                        <div className='upload-img'>
                                            <input type="file" id="preview-img" hidden
                                                onChange={(e) => this.handleOnchangeImg(e)}
                                            />
                                            <div className='label'>
                                                <label className='label-img' htmlFor="preview-img">Tải ảnh</label>
                                                <span><i className='fas fa-upload'></i></span>
                                            </div>
                                            <div className="prevImg"
                                                style={{ backgroundImage: `url(${this.state.prevImg})` }}
                                                onClick={() => this.openPrevImage()}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type='button' className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                            onClick={() => this.handleSaveUser()}
                                        >
                                            {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                        </button>
                                        {this.state.action === CRUD_ACTIONS.EDIT &&
                                            <button type="button" className='btn btn-warning ms-2'
                                                onClick={() => this.backToCreateUser()}
                                            >Back</button>
                                        }
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <TableManageUser
                    editUserInput={this.editUserInput}
                    action={this.state.action}
                />
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
        isLoading: state.admin.isLoading,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editAUser: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
