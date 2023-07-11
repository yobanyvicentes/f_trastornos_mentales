import { axiosInstance } from "../helpers/axios-config";

export const getAppointments = () => {
    return axiosInstance.get('/appointment', {
        headers:{
            'Content-type' : 'application/json'
        }
    });
};

export const getAppointmentById = (appointmentId) => {
    return axiosInstance.get(`/appointment/${appointmentId}`, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const postAppointment = (data) => {
    return axiosInstance.post('/appointment', data, {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

export const putAppointment = (appointmentId, data) => {
    return axiosInstance.put(`/appointment/${appointmentId}`,data,  {
        headers:{
            'Content-type' : 'application/json'
        }
    })
}
