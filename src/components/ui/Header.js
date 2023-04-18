import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                 <ul className="navbar-nav">
                    <li className="nav-item">
                         <NavLink className="nav-link" to="/">Inventarios</NavLink>
                    </li>
                    <li className="nav-item">
                         <NavLink className="nav-link" activeClassName='active' exact to="/">Activos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' exact to="/usuarios">Usuarios</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' exact to="/marcas">Marcas</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" activeClassName='active' exact to="/estados">Estados</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" activeClassName='active' exact to="/tipos">Tipos</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)
}
