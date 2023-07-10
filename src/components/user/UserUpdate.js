import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { putUser, getUserById } from '../../services/userService';
import { Link } from 'react-router-dom';

export const UserUpdate = () => {

    const { userId = '' } = useParams();
    const [usuario, setUsuario] = useState({});

    const [valoresform, setValoresform] = useState({});
    const { name = '', email = '', state = '', role = '', password = '' } = valoresform;

    const getUsuario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                title: 'Cargando....',
                text: 'Por favor espere',
                timer: 5000//milisegundos
            });
            Swal.showLoading();
            Swal.close();
            const { data } = await getUserById(userId);
            setUsuario(data);
        } catch (error) {
            Swal.close();
            console.log(error);
        }
    }
    useEffect(() => {
        getUsuario();
    }, [userId]);

    useEffect(() => {
        setValoresform({
            name: usuario.name,
            email: usuario.email,
            state: usuario.state,
            role: usuario.role,
            password: usuario.password
        });
    }, [usuario])

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const usuarioModel = {
            name,
            email,
            state,
            role,
            password
        }
        try {
            console.log(usuarioModel);
            Swal.fire({
                allowOutsideClick: false, title: 'Cargando....', text: 'Por favor espere', timer: 2000//milisegundos
            });
            const { data } = await putUser(userId, usuarioModel);
            console.log(data);
            Swal.close();
        } catch (error) {
            Swal.fire('Error', 'hubo un error...', 'error')
            console.log("error al crear el usuario");
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
                    <h5>Especialistas</h5>
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
                                    <h5>Actualizar Especialista</h5>
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
                                            <label className='form-label' for='rolid'>Rol</label>
                                            <select className='form-select' name="role" value={role} id='rolid' required
                                                onChange={(e) => {
                                                    handleOnChange(e);
                                                }}
                                            >
                                                <option selected>--Seleccione--</option>
                                                <option value="especialista">Especialista</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='mb-3'>
                                            <label className='form-label' for='passwordid'>Contraseña</label>
                                            <input className='form-control' type="password" name="password" value={password} id='password' required
                                                onChange={(e) => {
                                                    handleOnChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-1'>

                                        <button
                                            as={Link}
                                            to={`/user`}
                                            className='btn btn-primary'
                                            type="onSubmit"
                                        > Guardar
                                        </button>

                                    </div>
                                    <div className='col-md-1'>
                                        <Link to={`/user`}>
                                        <button className='btn btn-danger' type="onSubmit">Volver</button>
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

