import { axiosInstance } from "../helpers/axios-config";

export const getUsers = () => {
    return axiosInstance.get('/user', {
        headers:{
            'Content-type' : 'application/json'
        }
    });
};

export const getUserById = (userId) => {
    return axiosInstance.get(`/user/${userId}`, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const postUser = (data) => {
    return axiosInstance.post('/user', data, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const putUser = (userId, data) => {
    return axiosInstance.put(`/user/${userId}`,data,  {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}
