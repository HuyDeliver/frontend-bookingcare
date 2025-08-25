import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import './ManageSpecialty.scss'
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { createNewSpecialty, getAllSpecialty, getDetailSpecialty, postDetailSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            prevImg: '',
            avatar: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            isOpen: false,
            hasOlData: false,
            dataSpecialty: {},
            specialtyId: ''
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }

    }

    componentDidUpdate(prevProps) {

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
            res = await createNewSpecialty({
                name: this.state.name,
                avatar: this.state.avatar,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
            })
        } else {
            res = await postDetailSpecialty({
                id: this.state.specialtyId,
                name: this.state.name,
                avatar: this.state.avatar,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
            })

        }
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            this.setState({
                name: '',
                avatar: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                prevImg: '',
                hasOlData: false
            })
        } else {
            toast.error(res.errMessage)
        }

    }
    handleEditSpecialty = async (item) => {
        let res = await getDetailSpecialty({
            id: item.id,
            location: 'NOTAKE'
        })
        if (res && res.errCode === 0) {
            let data = res.data
            this.setState({
                specialtyId: data.id,
                name: data.name,
                prevImg: data.image,
                descriptionMarkdown: data.descriptionMarkdown,
                descriptionHTML: data.descriptionHTML,
                hasOlData: true
            })
        }
    }

    render() {
        let { dataSpecialty } = this.state
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="container">
                        <div className="row">
                            <div className="m-s-title col-12 text-center mt-4 mb-5">
                                Quản lý chuyên khoa
                            </div>
                            <div className="col-6 form-group">
                                <label htmlFor="" className='mb-2'>Tên chuyên khoa</label>
                                <input type="text" value={this.state.name} className='form-control p-2' onChange={(e) => this.handleOnchangeInput(e, 'name')} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="image" className=""><FormattedMessage id="manage-user.image" /></label>
                                <div className='upload-img-splt'>
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
                                            {dataSpecialty && !_.isEmpty(dataSpecialty) &&
                                                dataSpecialty.map((item, index) => {
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
                                                                    onClick={() => this.handleEditSpecialty(item)}
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
                        mainSrc={this.state.prevImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);