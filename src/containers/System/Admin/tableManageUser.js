import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { useCallback } from 'react';
class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userRedux: []
        }
    }
    async componentDidMount() {
        this.props.fetchAllUserStart()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }
    handleDeleteUser = (item) => {
        this.props.deleteAUser(item.id)
    }
    handleEditUser = (item) => {
        console.log("check item>> ", item)
        this.props.editUserInput(item)
    }
    render() {
        let listUser = this.state.userRedux
        return (
            <div className="table-user mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
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
                                        {listUser && listUser.length > 0 &&
                                            listUser.map((item, index) => {
                                                return (
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
                                                                onClick={() => this.handleEditUser(item)}
                                                            >
                                                                <i className='fas fa-pencil-alt'></i>
                                                            </button>
                                                            <button className="btn-danger"
                                                                onClick={() => this.handleDeleteUser(item)}
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
        )

    }
}
const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserStart: (data) => dispatch(actions.fetchAllUserStart(data)),
        deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
