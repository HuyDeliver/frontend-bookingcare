import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, delteteUserService, editUserService, getTopDoctorService, getAllDoctors, saveDetailDoctorService, getAllSpecialty } from '../../services/userService';
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
export const fetchAllScheduleHourStart = () => createFetchAPI('FETCH_SCHEDULE_TIME', 'TIME')
export const fetchPriceStart = () => createFetchAPI('FETCH_PRICE', 'PRICE')
export const fetchPaymentStart = () => createFetchAPI('FETCH_PAYMENT', 'PAYMENT')
export const fetchProvinceStart = () => createFetchAPI('FETCH_PROVINCE', 'PROVINCE')


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
            let res = await editUserService(data)
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

export const fetchTopDoctor = () => {
    return async (dispatch) => {
        try {
            let res = await getTopDoctorService('8')
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            } else {
                toast.error(res.errMessage)
                dispatch(fetchTopDoctorFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchTopDoctorFailed())
        }
    }
}
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})

export const fetchAllDoctor = () => {
    return async (dispatch) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error(res.errMessage)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED })
        }
    }
}

export const fetchAllSpecialty = () => {
    return async (dispatch) => {
        try {
            let res = await getAllSpecialty()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
                    dataSpecialty: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: actionTypes.FETCH_ALL_SPECIALTY_FAILED })
        }
    }
}
