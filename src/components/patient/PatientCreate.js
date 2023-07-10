import React, { useState } from "react";
import Swal from 'sweetalert2'
import {postPatient} from '../../services/patientService'

export const PatientCreate = ({listarObjetos}) => {
    const [modelo, setModelo ] = useState({});
    const { name = '', email ='', state='', password=''} = modelo;

    const handleOnChange = (event) => {
        setModelo({...modelo, [event.target.name]: event.target.value });
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const patientModel = { name, email, state, password}
        try {
            Swal.fire({
                allowOutsideClick: false, title: 'Cargando....', text: 'Por favor espere', timer: 2000//milisegundos
            });
            const { data } = await postPatient(patientModel);
            console.log(data);
            listarObjetos();
            setModelo({ [event.target.name]: '' });
        } catch (error) {
            Swal.fire('Error', 'hubo un error', 'error')
            console.log("error al crear el user");
        }
    }

    return (
        <form className="form"
        onSubmit={(e) => { handleOnSubmit(e) }}>
            <div className='row' te>
                <h5>Registrar Paciente</h5>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="mb-3">
                        <label className="form-label"
                            for="nameid">Nombre
                        </label>
                        <input className="form-control"
                            id="nameid"
                            required
                            type="text"
                            placeholder="nombre completo"
                            name="name"
                            value={name}
                            onChange={(event)=>{handleOnChange(event)}}
                            >
                        </input>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label className="form-label"
                            for="emailid">Email
                        </label>
                        <input className="form-control"
                            id="emailid"
                            required
                            type="email"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={(event)=>{handleOnChange(event)}}
                            >
                        </input>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label className="form-label"
                            for="stateid">Estado
                        </label>
                        <select className='form-select' name="state" value={state} id='estadoid' required
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
                <div className="col-md-3">
                    <div className="mb-3">
                        <label className="form-label"
                            for="passwordid">Contraseña
                        </label>
                        <input className="form-control"
                            id="passwordid"
                            required
                            type="password"
                            placeholder="contraseña"
                            name="password"
                            value={password}
                            onChange={(event)=>{handleOnChange(event)}}
                            >
                        </input>
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
