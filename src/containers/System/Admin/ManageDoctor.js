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
            listDoctors: []
        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctor()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
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
    }

    builDataInputSelect = (inputData) => {
        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let lableVi = `${item.lastName} ${item.firstName}`
                let lableEn = `${item.firstName} ${item.lastName} `
                object.label = language === LANGUAGES.VI ? lableVi : lableEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor })
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
            doctorId: this.state.selectedDoctor.value
        })
    }
    handleOnchangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    render() {
        return (
            <>
                <div className="manage-doctor container mt-5 mb-5">
                    <div className="row">
                        <div className="manage-doctor-title col-12 mb-5 text-center">Tạo thêm thông tin doctors</div>
                        <div className="col-6">
                            <label className='mb-2' for="">Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6">
                            <label className='mb-2' for="">Thông tin giới thiệu</label>
                            <textarea className='form-control' rows='4'
                                onChange={(e) => this.handleOnchangeDescription(e)}
                            ></textarea>
                        </div>
                        <div className="col-12 mt-5">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange} />
                        </div>
                        <div className="col-3 mt-4">
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveContent()}
                            >Lưu thông tin</button>
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
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
