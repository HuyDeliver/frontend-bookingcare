import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, delteteUserService, editUserService } from '../../services/userService';
import { toast } from 'react-toastify';

const createFetchAPI = (type, code) => {
    return async (dispatch) => {
        try {
            dispatch({ type: `${type}_START` })
            let res = await getAllCodeService(code)
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes[`${type}_SUCCESS`], data: res.data })
            } else {
                dispatch({ type: actionTypes[`${type}_FAILED`] })
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: actionTypes[`${type}_FAILED`] })
        }
    }
}

export const fetchGenderStart = () => createFetchAPI('FETCH_GENDER', 'GENDER')
export const fetchPositionStart = () => createFetchAPI('FETCH_POSITION', 'POSITION')
export const fetchRoleStart = () => createFetchAPI('FETCH_ROLE', 'ROLE')


export const createNewUser = (data) => {
    return async (dispatch) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
                toast.success('Create new user succeed !!! ')
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed())
                toast.error(res.errMessage)
            }
        } catch (error) {
            console.log(error)
            dispatch(saveUserFailed())
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})

//fetch all user
const getAllUserFetchAPI = (type, code) => {
    return async (dispatch) => {
        try {
            dispatch({ type: `${type}_START` })
            let res = await getAllUsers(code)
            if (res && res.errCode === 0) {
                toast.success("fetch all user succeed !!")
                dispatch({ type: actionTypes[`${type}_SUCCESS`], data: res.user.reverse() })
            } else {
                toast.error("Can't fetch all user")
                dispatch({ type: actionTypes[`${type}_FAILED`] })
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: actionTypes[`${type}_FAILED`] })
        }
    }
}

export const fetchAllUserStart = () => getAllUserFetchAPI('FETCH_ALL_USER', 'All')


//delete user
export const deleteAUser = (id) => {
    return async (dispatch) => {
        try {
            let res = await delteteUserService(id)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                toast.success(res.errMessage)
                dispatch(fetchAllUserStart())
            } else {
                toast.error(res.errMessage)
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch) => {
        try {
            console.log("checkll: ", data)
            let res = await editUserService(data)
            console.log("check res,", res)
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess())
                toast.success(res.errMessage)
                dispatch(fetchAllUserStart())
            } else {
                toast.error(res.errMessage)
                dispatch(editUserFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(editUserFailed())
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})