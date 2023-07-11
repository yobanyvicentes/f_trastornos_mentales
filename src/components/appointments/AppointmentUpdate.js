import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import {putAppointment, getAppointmentById} from '../../services/appointmentService'
import { getUsers } from '../../services/userService';
import { Link, useParams } from 'react-router-dom';

export const AppointmentUpdate = () => {
    //-------------parámetros----------------------
    const {appointmentId = ''} = useParams();

    const [appointment, setAppointment] = useState({});
    const [users, setUsers]  = useState([]);

    const [modelo, setModelo ] = useState({});
    const { user='', day='', month='', year='', time='', topic=''} = modelo;

    //------- obtener lista de usuarios ------------------------
    const listUsers = async () => {
        try {
          const { data } = await getUsers();
          setUsers(data);
        } catch (error) {
          console.log("ocurrio un error");
        }
    }
    useEffect(() => {
        listUsers();
    }, []);
    //-------- obtener elemento a editar --------------------------
    const getAppointment = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                title: 'Cargando....',
                text: 'Hola Por favor espere',
                timer: 5000//milisegundos
            });
            Swal.showLoading();
            Swal.close();
            let { data } = await getAppointmentById(appointmentId);
            setAppointment (data);
            console.log('appointment');
            console.log(appointment);
        } catch (error) {
            Swal.close();
            console.log(error);
        }
    }
    useEffect(() => {
        getAppointment();
    }, []);
    // ------------------------------------------------------------
    useEffect(() => {
        setModelo({
            user: appointment.user,
            day: appointment.day,
            month: appointment.month,
            year: appointment.year,
            time: appointment.time,
            topic: appointment.topic,
        });
        console.log('modelo');
        console.log(modelo);
    }, [appointment]);

    const handleOnChange = (e) => {
        setModelo({...modelo, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const Model = { user, day, month, year, time, topic };
        console.log('Model');
        console.log(Model);
        try {
            Swal.fire({
                allowOutsideClick: false, title: 'Cargando....', text: 'Por favor espere', timer: 2000//milisegundos
            });
            const { data } = await putAppointment(appointmentId, Model);
            console.log(data);
            setModelo({ [e.target.name]: '' });
        } catch (error) {
            Swal.fire('Error', 'hubo un error', 'error')
            console.log("error al crear un espacio disponible");
        }
    }

    //---------------------------------------------------------------
    return (
        <form className="form mx-3 mt-3"
        onSubmit={(e) => { handleOnSubmit(e) }}>
            <div className="row">
                <div className='row'>
                    <h5>Editar Disponibilidad</h5>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className="form-label"
                            for="userid">Usuario
                        </label>
                        <select className="form-select"
                            required
                            onChange={(e) => handleOnChange(e)}
                            name='user'
                            value={user}>
                            <option selected> --selecciona--</option>
                            {users.map ((user) => {
                                return (<option key={user._id} value={user._id}>{user.name}</option>)
                            })}
                    </select>
                    </div>
                </div>
                <div className="col-md-1">
                    <div className="mb-3">
                        <label className="form-label"
                            for="dayid">
                                Día
                        </label>
                        <input className="form-control"
                            id="dayid"
                            required
                            type="number"
                            placeholder="dd"
                            name="day"
                            value={day}
                            onChange={(e)=>{handleOnChange(e)}}>
                        </input>
                    </div>
                </div>
                <div className="col-md-1">
                    <div className="mb-3">
                        <label className="form-label"
                            for="monthid">
                                Mes
                        </label>
                        <input className="form-control"
                            id="monthid"
                            required
                            type="number"
                            placeholder="mm"
                            name="month"
                            value={month}
                            onChange={(e)=>{handleOnChange(e)}}>
                        </input>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label className="form-label"
                            for="yearid">
                                Año
                        </label>
                        <input className="form-control"
                            id="yearid"
                            required
                            type="number"
                            placeholder="yyyy"
                            name="year"
                            value={year}
                            onChange={(e)=>{handleOnChange(e)}}>
                        </input>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label className="form-label"
                            for="timeid">
                                Hora
                        </label>
                        <select className='form-select'
                                name="time"
                                value={time}
                                id='timeid'
                                required
                                type='text'
                                onChange={(e) => { handleOnChange(e); }} >
                                    <option selected>--Seleccione--</option>
                                    <option value="07:00">07:00</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label className="form-label"
                            for="topicid">
                                Especialidad o tema
                        </label>
                        <input className="form-control"
                            id="topicid"
                            required
                            type="text"
                            placeholder="especialidad"
                            name="topic"
                            value={topic}
                            onChange={(e)=>{handleOnChange(e)}}>
                        </input>
                    </div>
                </div>
            </div>
            <div className='row'>
                <button className='btn btn-primary col-md-1'
                    type="Submit"
                > Guardar
                </button>
                <Link className='col-md-1' to={`/appointment`}>
                    <button className='btn btn-danger'>Volver</button>
                </Link>
            </div>
        </form>
    );
}
