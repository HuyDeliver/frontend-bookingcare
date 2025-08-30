import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log(">>Mounting modal", this.props.currentUser)
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

    handleSaveUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === true) {
            //Call APi edit user
            this.props.editUser(this.state)
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
                <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "email")}
                                        value={this.state.email}
                                        disabled />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "password")}
                                        value={this.state.password}
                                        disabled />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="firstname" className="form-label">First name</label>
                                    <input type="text" className="form-control" name="firstName"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "firstName")}
                                        value={this.state.firstName} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastname" className="form-label">Last name</label>
                                    <input type="text" className="form-control" name="lastName"
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "lastName")}
                                        value={this.state.lastName} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="Address" className="form-label">Address</label>
                                    <input type="address" className="form-control" name="address" placeholder=""
                                        required
                                        onChange={(e) => this.handleOnchangeInput(e, "address")}
                                        value={this.state.address} />
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-2' color="primary" onClick={() => this.handleSaveUser()}>Save Changes</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
