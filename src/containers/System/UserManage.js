import { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, delteteUserService, editUserService } from '../../services/userService';
import { emitter } from '../../utils/emitter';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrayUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserService()
    }

    getAllUserService = async () => {
        let response = await getAllUsers('All')
        if (response && response.errCode === 0) {
            this.setState({
                arrayUsers: response.user
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data)
            console.log(respone)
            if (respone && respone.errCode !== 0) {
                alert(respone.errMessage)
            } else {
                await this.getAllUserService()
                this.setState({
                    isOpenModal: !this.state.isOpenModal
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            let response = await delteteUserService(userId)
            if (response && response.errCode === 0) {
                await this.getAllUserService()
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleEditUser = (user) => {
        console.log(">>check edit user", user)
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user)
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: !this.state.isOpenModalEditUser
                })
                await this.getAllUserService()
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let arrayUser = this.state.arrayUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpenModal={this.state.isOpenModal}
                    togglefromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpenModal={this.state.isOpenModalEditUser}
                        togglefromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />}
                <div className="title text-center">Manage User With Huydeliver</div>
                <div className="user-table">
                    <div className="container">
                        <div className="container mt-5">
                            <div className="mx-1 mb-2">
                                <button onClick={() => this.handleAddNewUser()}
                                    className='btn btn-primary px-3'><i className='fas fa-plus'></i>  Add new user</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark text-center align-middle">
                                        <tr>
                                            <th>Email</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Address</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center align-middle">
                                        {arrayUser && arrayUser.map((item, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td>
                                                            {item.email}
                                                        </td>
                                                        <td>
                                                            {item.firstName}
                                                        </td>
                                                        <td>
                                                            {item.lastName}
                                                        </td>
                                                        <td>
                                                            {item.address}
                                                        </td>
                                                        <td className="text-center">
                                                            <button className="btn-primary"
                                                                onClick={() => {
                                                                    this.handleEditUser(item)
                                                                }}
                                                            >
                                                                <i className='fas fa-pencil-alt'></i>
                                                            </button>
                                                            <button className="btn-danger"
                                                                onClick={() => {
                                                                    this.handleDeleteUser(item.id)
                                                                }}>
                                                                <i className='fas fa-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr >
                                                </>
                                            )

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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


export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
