import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getDetailDoctorService } from '../../../services/userService';
import { CRUD_ACTIONS } from '../../../utils';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor
    extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOlData: false,

            listPrices: [],
            selectedPrice: '',
            listPayment: [],
            selectedPayment: '',
            listProvince: [],
            selectedProvince: '',
        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchPriceDoctor()
        this.props.fetchPaymentDoctor()
        this.props.fetchProvinceDoctor()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.prices !== this.props.prices) {
            let dataSelect = this.builDataInputSelect(this.props.prices)
            console.log(dataSelect)
            this.setState({
                listPrices: dataSelect
            })
        }
        if (prevProps.payments !== this.props.payments) {
            let dataSelect = this.builDataInputSelect(this.props.payments)
            console.log(dataSelect)
            this.setState({
                listPayment: dataSelect
            })
        }
        if (prevProps.provinces !== this.props.provinces) {
            let dataSelect = this.builDataInputSelect(this.props.provinces)
            console.log(dataSelect)
            this.setState({
                listProvince: dataSelect
            })
        }

    }

    builDataInputSelect = (inputData, type) => {
        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let lableVi = type === 'USER' ? `${item.lastName} ${item.firstName}` : item.value_VN
                let lableEn = type === 'USER' ? `${item.firstName} ${item.lastName} ` : item.value_EN
                object.label = language === LANGUAGES.VI ? lableVi : lableEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })

        let res = await getDetailDoctorService(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOlData: true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOlData: false,
            })
        }
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContent = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOlData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            hasOlData: false,
        })
    }
    handleOnchangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handlePriceChange = (selectedPrice) => {
        this.setState({
            selectedPrice
        })
    }
    render() {

        // console.log("check props form redux: ", this.state)
        return (
            <>
                <div className="manage-doctor container mt-5 mb-5">
                    <div className="row">
                        <div className="manage-doctor-title col-12 mb-5 text-center"><FormattedMessage id="admin.manage-doctor.title" /></div>
                        <div className="col-6">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className="col-6">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.introduction" /></label>
                            <textarea className='form-control' rows='4'
                                onChange={(e) => this.handleOnchangeDescription(e)}
                                value={this.state.description}
                            ></textarea>
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for="">Chọn giá</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handlePriceChange}
                                options={this.state.listPrices}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for="">Chọn phương thức thanh toán</label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChange}
                                options={this.state.listPayment}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for="">Chọn tỉnh thành</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChange}
                                options={this.state.listProvince}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for="">Tên phòng khám</label>
                            <input type="text" value="" className='form-control' />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for="">Địa chỉ phòng khám</label>
                            <input type="text" value="" className='form-control' />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for="">Note</label>
                            <input type="text" value="" className='form-control' />
                        </div>
                        <div className="col-12 mt-5">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className="col-3 mt-4">
                            <button className={this.state.hasOlData === true ? 'btn btn-primary' : 'btn btn-success'}
                                onClick={() => this.handleSaveContent()}
                            >{this.state.hasOlData === true ? <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>} </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        prices: state.admin.prices,
        payments: state.admin.payments,
        provinces: state.admin.province
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchPriceDoctor: () => dispatch(actions.fetchPriceStart()),
        fetchPaymentDoctor: () => dispatch(actions.fetchPaymentStart()),
        fetchProvinceDoctor: () => dispatch(actions.fetchProvinceStart()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
