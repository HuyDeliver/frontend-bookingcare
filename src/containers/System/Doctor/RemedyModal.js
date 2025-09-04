import { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: '',
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleChangeEmail = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }
    handleOnchangeImg = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                image: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRedemy(this.state)
    }

    render() {
        let { isOpenModal, closeRedemyModal } = this.props
        return (
            <Modal
                isOpen={isOpenModal}
                size='lg'
                centered
            >
                <ModalHeader>
                    Gửi hóa đơn khám bệnh thành công
                </ModalHeader>
                <ModalBody >
                    <Row className='mb-2'>
                        <Col md={6}>
                            <FormGroup>
                                <Label className='mb-2'>Email bệnh nhân</Label>
                                <Input
                                    onChange={(e) => this.handleChangeEmail(e, 'email')}
                                    bsSize="sm"
                                    type="email"
                                    value={this.state.email}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label className='mb-2'>Chọn File đơn thuốc</Label>
                                <Input
                                    bsSize="sm"
                                    type="file"
                                    onChange={(e) => this.handleOnchangeImg(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="info"
                        onClick={() => this.handleSendRemedy()}
                        outline>Send</Button>
                    <Button
                        color="danger"
                        outline
                        onClick={closeRedemyModal}
                    >Cancel</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);