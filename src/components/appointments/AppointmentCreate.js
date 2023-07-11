import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { postAppointment                } from '../../services/appointmentService'
import { getAvailabilities } from '../../services/availabilityService';
import { getPatients } from '../../services/patientService';

export const AppointmentCreate = ({listarObjetos}) => {
    const [patients, setPatients]  = useState([]);
    const listPatients = async () => {
        try {
          const { data } = await getPatients();
          setPatients(data);
          console.log(data);
        } catch (error) {
          console.log("ocurrio un error");
        }
    }
    useEffect(() => {
        listPatients();
        console.log(getPatients());
    }, []);
    // ------------------------------------------------------------
    const [availabilities, setAvailabilities]  = useState([]);
    const listAvailabilities = async () => {
        try {
          const { data } = await getAvailabilities();
          setAvailabilities(data);
          console.log(data);
        } catch (error) {
          console.log("ocurrio un error");
        }
    }
    useEffect(() => {
        listAvailabilities();
        console.log(getAvailabilities());
    }, []);
    // ------------------------------------------------------------
    const [modelo, setModelo ] = useState({});
    const { patient = '', availability = ''} = modelo;
    // ------------------------------------------------------------
    const handleOnChange = (e) => {
        setModelo({...modelo, [e.target.name]: e.target.value });
    }
    // ------------------------------------------------------------
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const Model = { patient:patient, availability:availability};
        console.log('Model:');
        console.log(Model);
        try {
            Swal.fire({
                allowOutsideClick: false, title: 'Cargando....', text: 'Por favor espere', timer: 2000//milisegundos
            });
            const { data } = await postAppointment(Model);
            console.log(data);
            listarObjetos();
            setModelo({ [e.target.name]: '' });
        } catch (error) {
            Swal.fire('Error', 'hubo un error', 'error')
            console.log("error al crear un espacio disponible");
        }
    }

    return (
        <form className="form mx-3 mt-3"
        onSubmit={(e) => { handleOnSubmit(e) }}>
            <div className="row">
                <div className='row' te>
                    <h5>Registrar Cita</h5>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className="form-label"
                            for="patientid">Paciente
                        </label>
                        <select className="form-select"
                            id="patientid"
                            required
                            onChange={(e) => handleOnChange(e)}
                            name='patient'
                            value={patient}>
                            <option selected> --selecciona--</option>
                            {patients.map ((patient) => {
                                return (<option key={patient._id} value={patient._id}>{patient.name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label"
                            for="citaid">Disponibilidad
                        </label>
                        <select className="form-select"
                            id="citaid"
                            required
                            onChange={(e) => handleOnChange(e)}
                            name='availability'
                            value={availability}>
                            <option selected> --selecciona--</option>
                            {availabilities.map ((availability) => {
                                return (<option key={availability._id} value={availability._id}>
                                    {availability.user.name} {availability.day}/{availability.month}/{availability.year} {availability.time} {availability.topic}
                                    </option>)
                            })}
                    </select>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary m-2"
                type="submit">
                    Guardar
            </button>
        </form>
    );
}
