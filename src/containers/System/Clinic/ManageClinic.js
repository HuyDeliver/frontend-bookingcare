import { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageClinic.scss'
import { toast } from 'react-toastify';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { createNewClinic, getAllClinic, postDetailClinic, getDetailClinic } from '../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import * as actions from '../../../store/actions'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            prevImg: '',
            prevBg: '',
            avatar: '',
            background: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            isOpen: false,
            hasOlData: false,
            dataClinic: {},
            clinicId: '',
            address: '',
            selectedImage: '',
            selectedProvince: '',
            listProvinces: []
        };
    }

    async componentDidMount() {
        await this.getDataClinic()
        this.props.fetchProvinceClinic()

    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.province !== prevProps.province) {
            this.setState({
                listProvinces: this.buildDataSelect(this.props.province),
            })
        }
        if (this.state.hasOlData !== prevState.hasOlData) {
            await this.getDataClinic();
        }
    }
    getDataClinic = async () => {
        let res = await getAllClinic()
        console.log("cehck data", res.data)
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
        console.log("check state", this.state.dataClinic)
    }
    buildDataSelect = (inputData) => {
        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {}
                let labelVI = item.value_VN
                let labelEN = item.value_EN
                object.label = language === LANGUAGES.VI ? labelVI : labelEN
                object.value = item.key
                result.push(object)
            })
        }
        return result
    }
    handleOnchangeImg = async (e, id, prev) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                [prev]: objectUrl,
                [id]: base64
            })
        }
    }

    openPrevImage = (type) => {
        console.log(type)
        this.setState({
            isOpen: true,
            selectedImage: type
        })
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleSaveContent = async () => {
        let { hasOlData } = this.state
        let res = ''
        if (hasOlData === false) {
            res = await createNewClinic({
                name: this.state.name,
                address: this.state.address,
                avatar: this.state.avatar,
                province: this.state.selectedProvince.value,
                background: this.state.background,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
            })
        } else {
            res = await postDetailClinic({
                id: this.state.clinicId,
                name: this.state.name,
                address: this.state.address,
                avatar: this.state.avatar,
                province: this.state.selectedProvince.value,
                background: this.state.background,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
            })

        }
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            this.getDataClinic()
            this.setState({
                name: '',
                address: '',
                avatar: '',
                background: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                selectedProvince: '',
                prevImg: '',
                prevBg: '',
                hasOlData: false
            })
        } else {
            toast.error(res.errMessage)
        }
    }
    handleChange = (selectedProvince) => {
        this.setState({ selectedProvince })
    }
    handleEditClinic = async (item) => {
        let res = await getDetailClinic({
            id: item.id,
        })
        let { listProvinces } = this.state
        if (res && res.errCode === 0) {
            let data = res.data
            let province = ''
            province = listProvinces.find((item) => {
                return item.value === data.provinceId
            })
            this.setState({
                clinicId: data.id,
                address: data.address,
                selectedProvince: province,
                name: data.name,
                prevImg: data.image,
                avatar: data.image,
                prevBg: data.bgImage,
                background: data.bgImage,
                descriptionMarkdown: data.descriptionMarkdown,
                descriptionHTML: data.descriptionHTML,
                hasOlData: true
            })
        }
    }
    backToCreate = () => {
        this.setState({
            name: '',
            address: '',
            avatar: '',
            background: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            selectedProvince: '',
            prevImg: '',
            prevBg: '',
            hasOlData: false
        })
    }
    render() {
        const customStyles = {
            option: (styles, state) => ({
                ...styles,
                cursor: 'pointer',
            }),
            control: (styles) => ({
                ...styles,
                cursor: 'pointer',
            })
        }
        let { dataClinic } = this.state
        console.log(dataClinic)
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="container">
                        <div className="row">
                            <div className="m-s-title col-12 text-center mt-4 mb-5">
                                Quản lý phòng khám
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="" className='mb-2'>Tên phòng khám</label>
                                <input type="text" value={this.state.name} className='form-control p-2' onChange={(e) => this.handleOnchangeInput(e, 'name')} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="image" className=""><FormattedMessage id="manage-user.image" /></label>
                                <div className='upload-img-splt'>
                                    <input type="file" id="preview-img" hidden
                                        onChange={(e) => this.handleOnchangeImg(e, 'avatar', 'prevImg')}
                                    />
                                    <label htmlFor="preview-img" className="label">
                                        <span className="label-img">Tải ảnh</span>
                                        <span><i className="fas fa-upload"></i></span>
                                    </label>

                                    <div className="prevImg"
                                        style={{ backgroundImage: `url(${this.state.prevImg})` }}
                                        onClick={() => this.openPrevImage('avatar')}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="" className='mb-2'>Địa chỉ</label>
                                <input type="text" value={this.state.address} className='form-control p-2' onChange={(e) => this.handleOnchangeInput(e, 'address')} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="image" className="">Back-ground</label>
                                <div className='upload-img-splt'>
                                    <input type="file" id="preview-bg" hidden
                                        onChange={(e) => this.handleOnchangeImg(e, 'background', 'prevBg')}
                                    />
                                    <label htmlFor="preview-bg" className="label">
                                        <span className="label-img">Tải ảnh</span>
                                        <span><i className="fas fa-upload"></i></span>
                                    </label>

                                    <div className="prevImg"
                                        style={{ backgroundImage: `url(${this.state.prevBg})` }}
                                        onClick={() => this.openPrevImage('background')}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-4 mt-2">
                                <label htmlFor="" className='mb-2'>Tỉnh thành</label>
                                <Select
                                    styles={customStyles}
                                    className=''
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChange}
                                    options={this.state.listProvinces}
                                />
                            </div>
                            <div className="col-12 mt-5">
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.descriptionMarkdown}
                                />
                            </div>
                            <div className="col-3 mt-4">
                                <button className={this.state.hasOlData === true ? 'btn btn-primary' : 'btn btn-success'}
                                    onClick={() => this.handleSaveContent()}
                                >{this.state.hasOlData === true ? <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>} </button>
                                {this.state.hasOlData === true ? <button className='btn btn-warning' onClick={() => this.backToCreate()}>Quay lại</button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-user mt-4 mb-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-dark text-center align-middle">
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên phòng khám</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center align-middle">
                                            {dataClinic && !_.isEmpty(dataClinic) > 0 &&
                                                dataClinic.map((item, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <td>
                                                                {index}
                                                            </td>
                                                            <td>
                                                                {item.name}
                                                            </td>
                                                            <td className="text-center">
                                                                <button className="btn-primary"
                                                                    onClick={() => this.handleEditClinic(item)}
                                                                >
                                                                    <i className='fas fa-pencil-alt'></i>
                                                                </button>
                                                                <button className="btn-danger"
                                                                    onClick={() => this.handleDeleteUser()}
                                                                >
                                                                    <i className='fas fa-trash'></i>
                                                                </button>
                                                            </td>
                                                        </tr >
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.selectedImage === 'avatar' ? this.state.prevImg : this.state.prevBg}
                        onCloseRequest={() => this.setState({ isOpen: false, selectedImage: '' })}
                    />
                }
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        province: state.admin.province
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvinceClinic: () => dispatch(actions.fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);