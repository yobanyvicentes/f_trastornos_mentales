import React, { useState, useEffect } from 'react'
import { UserCreate } from './UserCreate';
import { getUsers } from '../../services/userService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const UserView = () => {

  const [users, setUsers] = useState([]);

  const listarUsers = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        title: 'Cargando....',
        text: 'Por favor espere',
        timer: 2000//milisegundos
      });
      Swal.showLoading();
      const { data } = await getUsers();
      setUsers(data);
      Swal.close();
    } catch (error) {
      console.log('ocurrió un error')
      Swal.close();
    }
  };

  useEffect(() => {
    listarUsers();
  }, []);

  return (
    <div className='container-fluid'>
      <div className='card mt-3 mb-2'>
        <div className='card-header'>
          <h5>Especialistas</h5>
        </div>
        <div className='card-body'>
          <UserCreate listarUsers={listarUsers} />
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
                    users.map((user) => {
                      return (
                        <tr key={user._id}>
                          <th className="col-md-1" value='index'>{1 + users.indexOf(user)} </th>
                          <td className="col-md-2">{user.name}</td>
                          <td className="col-md-2">{user.email}</td>
                          <td className="col-md-1">{user.state}</td>
                          <td className="col-md-2">{user.role}</td>
                          <td className="col-md-3">{user.updateDate}</td>
                          <td className="col-md-1">
                            <Link to={`user/edit/${user._id}`}>
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
