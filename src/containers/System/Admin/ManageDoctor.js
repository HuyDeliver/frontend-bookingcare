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
            nameClinic: '',
            addressClinic: '',
            note: '',
            listSpecialties: [],
            selectedSpecialty: ''
        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchPriceDoctor()
        this.props.fetchPaymentDoctor()
        this.props.fetchProvinceDoctor()
        this.props.fetchAllSpecialty()
    }

    updateSelectedList = (dataMap) => {
        let newState = []
        Object.keys(dataMap).forEach((key) => {
            newState[key] = this.buildDataInputSelect(dataMap[key].data, dataMap[key].type)
        })
        this.setState(newState)
    }

    componentDidUpdate(prevProps, prevState) {
        const dataMap = {
            listDoctors: { data: this.props.allDoctors, type: 'USER' },
            listPrices: { data: this.props.prices, type: 'PRICE' },
            listPayment: { data: this.props.payments, type: 'PAYMENT' },
            listProvince: { data: this.props.provinces, type: 'PROVINCE' },
            listSpecialties: { data: this.props.specialties, type: 'SPECIALTY' }
        }
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language || prevProps.prices !== this.props.prices ||
            prevProps.payments !== this.props.payments || prevProps.provinces !== this.props.provinces || prevProps.specialties !== this.props.specialties
        ) {
            this.updateSelectedList(dataMap)
        }
    }
    formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    buildDataInputSelect = (inputData, type) => {

        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                if (type === 'USER') {
                    let lableVi = `${item.lastName} ${item.firstName}`
                    let lableEn = `${item.firstName} ${item.lastName} `
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn
                    object.value = item.id
                    result.push(object)
                }
                if (type === 'PRICE') {
                    let lableVi = this.formatNumber(item.value_VN)
                    let lableEn = `${item.value_EN} USD`
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn
                    object.value = item.key
                    result.push(object)
                }
                if (type === 'PAYMENT' || type === 'PROVINCE') {
                    let lableVi = item.value_VN
                    let lableEn = item.value_EN
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn
                    object.value = item.key
                    result.push(object)
                }
                if (type === 'SPECIALTY') {
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                }

            })
        }
        return result
    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
        let { listPayment, listPrices, listProvince, listSpecialties } = this.state
        let res = await getDetailDoctorService(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Doctor_infor) {
            let markdown = res.data.Markdown
            let detail = res.data.Doctor_infor
            let selectedPrice = '', selectedPayment = '', selectedProvince = '', selectedSpecialty = ''
            if (detail) {
                selectedPrice = listPrices.find(item => {
                    return item && item.value === detail.priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === detail.paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === detail.provinceId
                })
                selectedSpecialty = listSpecialties.find(item => {
                    return item && item.value === detail.specialtyId
                })
            }

            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                nameClinic: detail.nameClinic,
                addressClinic: detail.addressClinic,
                note: detail.note,
                hasOlData: true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
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
            action: this.state.hasOlData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            selectedSpecialty: this.state.selectedSpecialty.value
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            doctorId: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectedSpecialty: '',
            hasOlData: false,
        })
    }
    backToCreateDoctor = () => {
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            doctorId: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectedSpecialty: '',
            hasOlData: false,
        })
    }
    handleSelectedChange = (value, field) => {
        this.setState({
            [field]: value
        })
    }
    render() {
        console.log("check state: ", this.state)
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
                                onChange={(e) => this.handleSelectedChange(e.target.value, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={(options) => this.handleSelectedChange(options, 'selectedPrice')}
                                options={this.state.listPrices}
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose" />}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={(options) => this.handleSelectedChange(options, 'selectedPayment')}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose" />}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.province" /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={(options) => this.handleSelectedChange(options, 'selectedProvince')}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose" />}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                            <input type="text" className='form-control'
                                onChange={(e) => this.handleSelectedChange(e.target.value, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                            <input type="text" className='form-control'
                                onChange={(e) => this.handleSelectedChange(e.target.value, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.note" /></label>
                            <input type="text" className='form-control'
                                onChange={(e) => this.handleSelectedChange(e.target.value, 'note')}
                                value={this.state.note}
                            />
                        </div>
                        <div className="col-4 form-group mt-3">
                            <label className='mb-2' for=""><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={(options) => this.handleSelectedChange(options, 'selectedSpecialty')}
                                options={this.state.listSpecialties}
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose" />}
                            />
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
                            {this.state.hasOlData === true &&
                                <button
                                    className='btn btn-warning ms-2'
                                    onClick={() => this.backToCreateDoctor()}
                                >Back</button>
                            }
                        </div>
                    </div>
                </div >
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
        provinces: state.admin.province,
        specialties: state.admin.specialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchPriceDoctor: () => dispatch(actions.fetchPriceStart()),
        fetchPaymentDoctor: () => dispatch(actions.fetchPaymentStart()),
        fetchProvinceDoctor: () => dispatch(actions.fetchProvinceStart()),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
