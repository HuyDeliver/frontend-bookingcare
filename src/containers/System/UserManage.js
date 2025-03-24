import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrayUsers: [],
            isOpenModal: false
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
                                                            <button className="btn-primary">
                                                                <i className='fas fa-pencil-alt'></i>
                                                            </button>
                                                            <button className="btn-danger">
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
