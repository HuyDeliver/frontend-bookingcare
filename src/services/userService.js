import axios from "../axios"
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    console.log('check data: ', data)
    return axios.post('/api/create-new-users', data)
}
const delteteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const editUserService = (inputData) => {
    return axios.put('/api/update-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorService = (limitInput) => {
    return axios.get(`/api/top-doctor-home?limit=${limitInput}`)
}

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}

const getDetailDoctorService = (inputid) => {
    return axios.get(`/api/get-detail-doctor?id=${inputid}`)
}
const saveDoctorScheduleService = (input) => {
    return axios.post('/api/post-doctor-schedule', input)
}

const getScheduleDoctorByDate = (doctorID, date) => {
    return axios.get(`/api/get-schedule-doctor?doctorID=${doctorID}&date=${date}`)
}

const getDoctorBookingInfor = (doctorID) => {
    return axios.get(`/api/get-booking-infor-doctor?doctorID=${doctorID}`)
}

const getProfileDoctor = (doctorID) => {
    return axios.get(`/api/get-profile-doctor?doctorID=${doctorID}`)
}
const postPatientBooking = (data) => {
    return axios.post('/api/post-patient-booking', data)
}

const postVerifyEmailBooking = (data) => {
    return axios.post('/api/verify-booking-appointment', data)
}
export {
    handleLogin, getAllUsers, createNewUserService, delteteUserService, editUserService, getAllCodeService
    , getTopDoctorService, getAllDoctors, saveDetailDoctorService, getDetailDoctorService, saveDoctorScheduleService,
    getScheduleDoctorByDate, getProfileDoctor, getDoctorBookingInfor, postPatientBooking, postVerifyEmailBooking
}