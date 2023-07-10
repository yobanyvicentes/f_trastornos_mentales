import { axiosInstance } from "../helpers/axios-config";

export const getPatients = () => {
    return axiosInstance.get('/patient', {
        headers:{
            'Content-type' : 'application/json'
        }
    });
};

export const getPatientById = (patientId) => {
    return axiosInstance.get(`/patient/${patientId}`, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const postPatient = (data) => {
    return axiosInstance.post('/patient', data, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const putPatient = (patientId, data) => {
    return axiosInstance.put(`/patient/${patientId}`,data,  {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}
