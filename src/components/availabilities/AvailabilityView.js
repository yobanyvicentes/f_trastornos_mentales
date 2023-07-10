import React, { useState, useEffect } from 'react'
import { getAvailabilities } from '../../services/availabilityService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { AvailabilityCreate } from './AvailabilityCreate';

export const AvailabilityView = () => {
    const [availabilities, setAvailabilities] = useState([]);

    const listarObjetos = async () => {
    try {
        Swal.fire({
        allowOutsideClick: false,
        title: 'Cargando....',
        text: 'Por favor espere',
        timer: 2000//milisegundos
      });
      Swal.showLoading();
      const { data } = await getAvailabilities();
      setAvailabilities(data);
      Swal.close();
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
        <AvailabilityCreate listarObjetos={listarObjetos}/>
        <div className='card-body mt-2'>
          <div className='row'>
            <div className='col'>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-md-1">#</th>
                    <th className="col-md-2">Especialista</th>
                    <th className="col-md-1">Dia</th>
                    <th className="col-md-1">Mes</th>
                    <th className="col-md-1">Año</th>
                    <th className="col-md-2">Hora de inicio</th>
                    <th className="col-md-2">Especialidad</th>
                    <th className="col-md-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    availabilities.map((availability) => {
                      return (
                        <tr key={availability._id}>
                          <th className="col-md-1" value='index'>{1 + availabilities.indexOf(availability)} </th>
                          <td className="col-md-2">{availability.user.name}</td>
                          <td className="col-md-1">{availability.day}</td>
                          <td className="col-md-1">{availability.month}</td>
                          <td className="col-md-1">{availability.year}</td>
                          <td className="col-md-2">{availability.time}</td>
                          <td className="col-md-2">{availability.topic}</td>
                          <td className="col-md-1">
                            <Link className='col' to={`availability/edit/${availability._id}`}>
                              <button className='btn btn-success m-1'>
                                editar
                              </button>
                            </Link>
                          </td>
                          <td className="col-md-2">
                            <Link  className='col' to={`availability/edit/${availability._id}`}>
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


