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
    console.log('check data: ', data)
    return axios.post('/api/save-info-doctors', data)
}
export { handleLogin, getAllUsers, createNewUserService, delteteUserService, editUserService, getAllCodeService, getTopDoctorService, getAllDoctors, saveDetailDoctorService }