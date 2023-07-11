import React, { useState, useEffect } from 'react'
import { getAppointments } from '../../services/appointmentService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { AppointmentCreate } from './AppointmentCreate';

export const AppointmentView = () => {
    const [appointments, setAppointments] = useState([]);

    const listarObjetos = async () => {
    try {
        Swal.fire({
        allowOutsideClick: false,
        title: 'Cargando....',
        text: 'Por favor espere',
        timer: 2000//milisegundos
      });
      Swal.showLoading();
      const { data } = await getAppointments();
      setAppointments(data);
      Swal.close();
      console.log('appointments:');
      console.log(data);
    } catch (error) {
      console.log('ocurrió un error')
      Swal.close();
    }
  };

  useEffect(() => {
    listarObjetos();
  }, []);
    return (
    <div className='container-fluid'>
      <div className='card mt-3 mb-2'>
        <div className='card-header'>
          <h5>Fechas disponibles</h5>
        </div>
        <AppointmentCreate listarObjetos={listarObjetos}/>
        <div className='card-body mt-2'>
          <div className='row'>
            <div className='col'>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-md-1">#</th>
                    <th className="col-md-2">Paciente</th>
                    <th className="col-md-2">Especialista</th>
                    <th className="col-md-1">Dia</th>
                    <th className="col-md-1">Mes</th>
                    <th className="col-md-1">Año</th>
                    <th className="col-md-1">Hora de inicio</th>
                    <th className="col-md-1">Especialidad</th>
                    <th className="col-md-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    appointments.map((appointment) => {
                      return (
                        <tr key={appointment._id}>
                          <th className="col-md-1" value='index'>{1 + appointments.indexOf(appointment)} </th>
                          <td className="col-md-2">{appointment.patient.name}</td>
                          <td className="col-md-1">{appointment.availability.user.name}</td>
                          <td className="col-md-1">{appointment.availability.day}</td>
                          <td className="col-md-1">{appointment.availability.month}</td>
                          <td className="col-md-1">{appointment.availability.year}</td>
                          <td className="col-md-2">{appointment.availability.time}</td>
                          <td className="col-md-2">{appointment.availability.topic}</td>
                          <td className="col-md-1">
                            <Link className='col' to={`appointment/edit/${appointment._id}`}>
                              <button className='btn btn-success m-1'>
                                editar
                              </button>
                            </Link>
                          </td>
                          <td className="col-md-2">
                            <Link  className='col' to={`appointment/edit/${appointment._id}`}>
                              <button className='btn btn-success m-1'>
                                elegir
                              </button>
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


