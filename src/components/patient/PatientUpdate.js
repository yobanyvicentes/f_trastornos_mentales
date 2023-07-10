import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams,  Link  } from 'react-router-dom';
import { putPatient, getPatientById } from '../../services/patientService';

export const PatientUpdate = () => {

    const { patientId = '' } = useParams();
    const [patient, setPatient] = useState({});

    const [valoresform, setValoresform] = useState({});
    const { name = '', email = '', state = '', password = '' } = valoresform;

    const getPatient = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                title: 'Cargando....',
                text: 'Por favor espere',
                timer: 5000//milisegundos
            });
            Swal.showLoading();
            Swal.close();
            const { data } = await getPatientById(patientId);
            setPatient(data);
        } catch (error) {
            Swal.close();
            console.log(error);
        }
    }
    useEffect(() => {
        getPatient();
    }, [patientId]);

    useEffect(() => {
        setValoresform({
            name: patient.name,
            email: patient.email,
            state: patient.state,
            password: patient.password
        });
    }, [patient])

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const patientModel = {
            name,
            email,
            state,
            password
        }
        try {
            console.log(patientModel);
            Swal.fire({
                allowOutsideClick: false, title: 'Cargando....', text: 'Por favor espere', timer: 2000//milisegundos
            });
            const { data } = await putPatient(patientId, patientModel);
            console.log(data);
            Swal.close();
        } catch (error) {
            Swal.fire('Error', 'hubo un error...', 'error')
            console.log("error al crear el patient");
        }
    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresform({ ...valoresform, [name]: value });
    }

    return (
        <div className='container-fluid'>
            <div className='card mt-3 mb-2'>
                <div className='card-header'>
                    <h5>Pacientes</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col'>
                            <form
                                className='form'
                                onSubmit={(event) => {
                                    handleOnSubmit(event)
                                }
                                }
                            >
                                <div className='row' te>
                                    <h5>Actualizar Paciente</h5>
                                </div>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <div className='mb-3'>
                                            <label className='form-label' for='nameid'>Nombre</label>
                                            <input className='form-control' type="text" name="name" value={name} id='nameid' required
                                                onChange={(e) => {
                                                    handleOnChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='mb-3'>
                                            <label className='form-label' for='emailid'>Email</label>
                                            <input className='form-control' type="text" name="email" value={email} id='emailid' required
                                                onChange={(e) => {
                                                    handleOnChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='mb-3'>
                                            <label className='form-label' for='stateid'>Estado</label>
                                            <select className='form-select' name="state" value={state} id='stateid' required
                                                onChange={(e) => {
                                                    handleOnChange(e);
                                                }}
                                            >
                                                <option selected>--Seleccione--</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='mb-3'>
                                            <label className='form-label' for='passwordid'>Contraseña</label>
                                            <input className='form-control' type="password" name="password" value={password} id='passwordid' required
                                                onChange={(e) => { handleOnChange(e); }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-1'>
                                        <button
                                            className='btn btn-primary'
                                            type="Submit"
                                        > Guardar
                                        </button>
                                    </div>
                                    <div className='col-md-1'>
                                        <Link to={`/patient`}>
                                        <button className='btn btn-danger' type="Submit">Volver</button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
