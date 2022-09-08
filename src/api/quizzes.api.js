import apiClient from './general'; 

export const getQuizzesReq = async ()=>{
    let response = await apiClient.get('/quizzes');
    return response.data;
}