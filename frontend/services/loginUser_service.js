import api from "../utils/axios"

export default async function loginUserService(loginData) {

    const res = await api.post('/auth/login', loginData)
    return res.data;
    
}