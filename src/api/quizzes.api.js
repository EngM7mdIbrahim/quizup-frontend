import apiClient from './general'; 

export const getQuizzesReq = async ()=>{
    let response = await apiClient.get('/quizzes');
    return response.data;
}

export const deleteQuizReq = async (id)=>{
    await apiClient.delete(`/quizzes/${id}`);
}