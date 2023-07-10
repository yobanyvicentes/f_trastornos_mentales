import React, { useState } from 'react';
import { postUser } from '../../services/userService';
import Swal from 'sweetalert2';

export const UserCreate = ({ listarUsers }) => {

    const [valoresform, setValoresform] = useState({});
    const { name = '', email = '', state = '', password = '', role = ''} = valoresform;

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const userModel = { name, email, state, password, role };
        try {
            Swal.fire({
                allowOutsideClick: false, title: 'Cargando....', text: 'Por favor espere', timer: 2000//milisegundos
            });
            const { data } = await postUser(userModel);
            console.log(data);
            listarUsers();
            setValoresform({ [e.target.name]: '' });
        } catch (error) {
            Swal.fire('Error', 'hubo un error', 'error')
            console.log("error al crear el user");
        }
    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresform({ ...valoresform, [name]: value });
    }

    return (
        <div className='row'>
            <div className='col'>
                <form
                    className='form'
                    onSubmit={(e) => {
                        handleOnSubmit(e)
                    }
                    }
                >
                    <div className='row' te>
                        <h5>Registrar Especialista</h5>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='mb-3'>
                                <label className='form-label' for='nombreid'>Nombre</label>
                                <input className='form-control' type="text" name="name" value={name} id='nombreid' required
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
                                <label className='form-label' for='estadoid'>Estado</label>
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
                            <button className='btn btn-primary' type="onSubmit" to='/'>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
