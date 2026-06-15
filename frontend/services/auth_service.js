import api from "../utils/axios"

export async function loginUserService(loginData) {

    const res = await api.post('/auth/login', loginData)
    return res.data;   
}


export async function logoutUserService() {
    const res = await api.post('/auth/logout')
    return res.data;   
}


export async function getCurrentUser() {

    const res = await api.get('/auth/me')
    return res.data;   
}
