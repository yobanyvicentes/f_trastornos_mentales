import React, { useState, useEffect } from 'react'
import { PatientCreate } from './PatientCreate';
import { getPatients } from '../../services/patientService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const PatientView = () => {

  const [patients, setPatients] = useState([]);

  const listarObjetos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        title: 'Cargando....',
        text: 'Por favor espere',
        timer: 2000//milisegundos
      });
      Swal.showLoading();
      const { data } = await getPatients();
      setPatients(data);
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
          <h5>Patients</h5>
        </div>
        <div className='card-body'>
          <PatientCreate listarObjetos={listarObjetos} />
          <div className='row mt-5'>
            <div className='col'>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-md-1">#</th>
                    <th className="col-md-2">Nombre</th>
                    <th className="col-md-2">Email</th>
                    <th className="col-md-1">Estado</th>
                    <th className="col-md-2">Role</th>
                    <th className="col-md-3">Fecha Actualización</th>
                    <th className="col-md-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    patients.map((patient) => {
                      return (
                        <tr key={patient._id}>
                          <th className="col-md-1" value='index'>{1 + patients.indexOf(patient)} </th>
                          <td className="col-md-2">{patient.name}</td>
                          <td className="col-md-2">{patient.email}</td>
                          <td className="col-md-1">{patient.state}</td>
                          <td className="col-md-2">{patient.role}</td>
                          <td className="col-md-3">{patient.updateDate}</td>
                          <td className="col-md-1">
                            <Link to={`patient/edit/${patient._id}`}>
                              <button className='btn btn-success'>
                                editar
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
