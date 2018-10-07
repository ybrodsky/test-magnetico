import * as React from 'react';
import { Link } from 'react-router-dom';

const appartmentRow = (appartment, i) => {
  return (
    <tr key={i}>
      <td>{appartment.location}</td>
      <td>{appartment.size}m²</td>
      <td>${appartment.night}</td>
      <td>${appartment.month}</td>
      <td>
        <Link className="btn btn-block btn-sm btn-primary" to={`/departamentos/alquilar/${appartment.id}`}>
          <i className="fa fa-book"></i> Alquilar
        </Link>
        <Link className="btn btn-secondary btn-sm btn-block" to={`/departamentos/editar/${appartment.id}`}>
          <i className="fa fa-pencil"></i> Modificar
        </Link>
      </td>
    </tr>
  );
};

export default function ({ appartments }) {
  return (
    <div className="card mb-5">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className="fa fa-building"></i> Departamentos
            <Link className="btn btn-light pull-right" to="/departamentos/agregar">
              <i className="fa fa-plus-circle"></i> Agregar
            </Link>
          </h3>
        </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Ubicacion</th>
              <th>Tamaño</th>
              <th>Precio por noche</th>
              <th>Precio por mes (30 dias)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              appartments.map(appartmentRow)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
