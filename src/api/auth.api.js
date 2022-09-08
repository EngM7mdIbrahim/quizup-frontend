import apiClient from './general'; 
export const signInReq = async (user)=>{
    let response = await apiClient.post('/auth/signin',{
        email: user.email,
        password: user.password
    })
    return response;
}

export const signUpReq = async (user)=>{
    let response = await apiClient.post('/auth/signup',{
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword
    })
    return response;
}

export const refreshTokenReq = async(refreshToken)=>{
    let response = await apiClient.post('/auth/token', {
        refreshToken
    })
    return response.data
}