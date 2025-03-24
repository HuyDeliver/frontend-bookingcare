import axios from "../axios"
const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    console.log(">>check data message: ", data)
    return axios.post('/api/create-new-users', data)
}
export { handleLogin, getAllUsers, createNewUserService }