import * as React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Input } from './../Shared/BsInput';
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const RenderForm = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  calculatePriceAndDiscount,
  appartment,
}) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {
        appartment.userHasDiscount &&
        <div className="alert alert-info text-center">
          Inquilino recurrente. 5% de descuento!!
        </div>
      }
      <div className="form-group">
        <label>Fecha de ingreso</label>
        <Datetime
          value={values.checkin}
          closeOnSelect={true}
          onChange={(newValue) => {
            const value = newValue && newValue.format ? newValue.format('DD-MM-YYYY') : '';
            setFieldValue('checkin', value);

            const { discount, subtotal } = calculatePriceAndDiscount({
              ...values,
              checkin: value,
            });
            setFieldValue('discount', discount);
            setFieldValue('subtotal', subtotal);
          }}
          dateFormat="DD-MM-YYYY"
          timeFormat={false}
        />
      </div>
      <div className="form-group">
        <label>Fecha de salida</label>
        <Datetime
          value={values.checkout}
          closeOnSelect={true}
          onChange={(newValue) => {
            const value = newValue && newValue.format ? newValue.format('DD-MM-YYYY') : '';
            setFieldValue('checkout', value);

            const { discount, subtotal } = calculatePriceAndDiscount({
              ...values,
              checkout: value,
            });
            setFieldValue('discount', discount);
            setFieldValue('subtotal', subtotal);
          }}
          dateFormat="DD-MM-YYYY"
          timeFormat={false}
        />
      </div>
      <hr/>
      <Input
        label="Descuento"
        name="discount"
        value={values.discount}
        readOnly={true}
        errors={errors}
      />
      <Input
        label="Subtotal"
        name="subtotal"
        value={values.subtotal}
        readOnly={true}
        errors={errors}
      />
      <Input
        label="Total"
        name="total"
        value={values.subtotal - values.discount}
        readOnly={true}
        errors={errors}
      />
      <div className="form-group text-right">
        <button type="submit" className="btn btn-lg btn-dark" disabled={isSubmitting}>
          ALQUILAR
        </button>
      </div>
    </form>
  );
}

export default class TestForm extends React.Component {
  render() {
    const {
      onSubmit, appartment, rent, calculatePriceAndDiscount, loading,
    } = this.props;

    return (
      <div className="card mb-5">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className="fa fa-money"></i> Alquilar
            <Link className="btn btn-light pull-right" to="/">
              <i className="fa fa-arrow-left"></i> Volver
            </Link>
          </h3>

        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Ubicacion: {appartment.location}</b>
                </li>
                <li className="list-group-item">
                  <b>Tamaño: {appartment.size}m²</b>
                </li>
                <li className="list-group-item">
                  <b>Precio por noche: ${appartment.night}</b>
                </li>
                <li className="list-group-item">
                  <b>Precio por mes: ${appartment.month}</b>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              {
                !loading && <Formik
                  initialValues={rent}
                  enableReinitialize={true}
                  onSubmit={
                    async (values, { setSubmitting, setErrors }) => {
                      try {
                        const cleanValues = {
                          appartment_id: values.appartment_id,
                          checkin: moment(values.checkin, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                          checkout: moment(values.checkout, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                        };

                        await onSubmit(cleanValues);
                        setSubmitting(false);
                      } catch (err) {
                        if (err.response.data.errors) {
                          setErrors(err.response.data.errors);
                        }

                        setSubmitting(false);
                      }
                    }
                  }
                  render={(formikProps) => (
                    <RenderForm {...formikProps} {... { calculatePriceAndDiscount, appartment }} />
                  )}
                >
                </Formik>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
