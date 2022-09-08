import apiClient from './general'; 

export const getClassesReq = async ()=>{
    let response = await apiClient.get('/classes');
    return response.data;
}
