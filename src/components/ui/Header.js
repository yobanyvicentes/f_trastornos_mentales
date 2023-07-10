import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Salud Mental</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='Active' exact aria-current="page" to="/user">Especialistas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='Active' exact aria-current="page" to="/availability">Disponibilidad</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='Active' exact aria-current="page" to="/appointment">Mis citas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='Active' exact aria-current="page" to="/patient">Pacientes</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

