import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/bootstrap.theme.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'assets/css/styles.css';

import * as Api from 'api';
import LoginContainer from './../Login/Index';
import AppartmentsIndexContainer from './../Appartments/Index';
import AppartmentsAddContainer from './../Appartments/Add';
import AppartmentsEditContainer from './../Appartments/Edit';
import AppartmentsRentcontainer from './../Appartments/Rent';
import RentsIndexContainer from './../Rents/Index';

class NavbarContainer extends React.Component {

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="javascript:void(0)">
            Alquileres
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Departamentos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mis-alquileres">Mis alquileres</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    this.logout()
                  }}
                >
                  Salir
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid" style={{ marginTop: '3%' }}>
          <div className="row">
            <div className="col">
              <Route exact path="/" component={AppartmentsIndexContainer} />
              <Route exact path="/departamentos/agregar" component={AppartmentsAddContainer} />
              <Route exact path="/departamentos/editar/:appartmentId" component={AppartmentsEditContainer} />
              <Route exact path="/departamentos/alquilar/:appartmentId" component={AppartmentsRentcontainer} />
              <Route exact path="/mis-alquileres" component={RentsIndexContainer} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const NoNavbarContainer = () => (
  <div className="container-fluid" style={{ marginTop: '3%' }}>
    <div className="row">
      <div className="col">
        <Route exact path="/login" component={LoginContainer} />
      </div>
    </div>
  </div>
);

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <section>
          <Switch>
            <Route exact path="/login" component={NoNavbarContainer}/>
            <Route component={NavbarContainer}/>
          </Switch>
          <ToastContainer position="bottom-left"/>
        </section>
      </Router>
    );
  }
}
