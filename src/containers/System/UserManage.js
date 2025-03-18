import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrayUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('All')
        if (response && response.errCode === 0) {
            this.setState({
                arrayUsers: response.user
            })
        }
    }


    render() {
        console.log("check state", this.state)
        let arrayUser = this.state.arrayUsers
        return (
            <div className="user-container">
                <div className="title text-center">Manage User With Huydeliver</div>
                <div className="user-table">
                    <div className="container">
                        <div className="container mt-5">
                            <h2 className="mb-4 text-center">User Information</h2>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover">
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
                                            console.log(">>check map", item, index)
                                            return (
                                                <>
                                                    <tr>
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
                                                    </tr>
                                                </>
                                            )

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
