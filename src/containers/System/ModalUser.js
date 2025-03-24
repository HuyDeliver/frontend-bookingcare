import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.togglefromParent()
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })

    }

    checkValidInput = () => {
        let isValidInput = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValidInput = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }
        return isValidInput
    }

    addNewUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                toggle={() => this.toggle()}
                className='abc'
                size='md'
            >
                <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "email")}
                                        value={this.state.email} />
                                </div>
                                <div className="col-md-6">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "password")}
                                        value={this.state.password} />
                                </div>
                                <div className="col-md-6">
                                    <label for="firstname" className="form-label">First name</label>
                                    <input type="text" className="form-control" name="firstName"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "firstName")}
                                        value={this.state.firstname} />
                                </div>
                                <div className="col-md-6">
                                    <label for="lastname" className="form-label">Last name</label>
                                    <input type="text" className="form-control" name="lastName"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "lastName")}
                                        value={this.state.lastname} />
                                </div>
                                <div className="col-12">
                                    <label for="Address" className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" placeholder=""
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "address")}
                                        value={this.state.address} />
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-2' color="primary" onClick={() => this.addNewUser()}>Add New</Button>{' '}
                    <Button className='px-2' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
