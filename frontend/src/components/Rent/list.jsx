import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

const rentRow = (rent, i) => {
  return (
    <tr key={i}>
      <td>
        <Link to={`/departamentos/editar/${rent.appartment_id}`}>
          Ver
        </Link>
      </td>
      <td>{moment(rent.checkin).format('DD-MM-YYYY')}</td>
      <td>{moment(rent.checkout).format('DD-MM-YYYY')}</td>
      <td>${rent.discount}</td>
      <td>${rent.subtotal}</td>
      <td>${rent.subtotal - rent.discount}</td>
    </tr>
  );
};

export default function ({ rents }) {
  return (
    <div className="card mb-5">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className="fa fa-book"></i> Mis alquileres
          </h3>
        </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Checkin</th>
              <th>Checkout</th>
              <th>Descuento</th>
              <th>Subtotal</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              rents.map(rentRow)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
