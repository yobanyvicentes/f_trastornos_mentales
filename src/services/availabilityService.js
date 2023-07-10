import { axiosInstance } from "../helpers/axios-config";

export const getAvailabilities = () => {
    return axiosInstance.get('/availability', {
        headers:{
            'Content-type' : 'application/json'
        }
    });
};

export const getAvailabilityById = (availabilityId) => {
    return axiosInstance.get(`/availability/${availabilityId}`, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const postAvailability = (data) => {
    return axiosInstance.post('/availability', data, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const putAvailability = (availabilityId, data) => {
    return axiosInstance.put(`/availability/${availabilityId}`,data,  {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}
