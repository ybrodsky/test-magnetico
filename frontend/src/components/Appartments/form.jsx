import * as React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import { Input } from './../Shared/BsInput';
import 'react-datetime/css/react-datetime.css';

const RenderForm = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="row">
        <div className="col-md-6">
          <Input
            label="Ubicacion"
            type="text"
            name="location"
            onChange={handleChange}
            value={values.location}
            errors={errors}
          />
          <Input
            label="Tamaño (metros cuadrados)"
            type="number"
            name="size"
            onChange={handleChange}
            value={values.size}
            errors={errors}
          />
          <Input
            label="Precio por noche (ARS)"
            type="number"
            name="night"
            onChange={handleChange}
            value={values.night}
            errors={errors}
          />
          <Input
            label="Precio por mes (ARS)"
            type="number"
            name="month"
            onChange={handleChange}
            value={values.month}
            errors={errors}
          />
          <div className="form-group text-right">
            <button type="submit" className="btn btn-lg btn-dark" disabled={isSubmitting}>
              GUARDAR
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default class AppartmentsForm extends React.Component {
  render() {
    const { onSubmit, appartment, loading } = this.props;

    return (
      <div className="card mb-5">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <i className="fa fa-pencil"></i> Departamento
            <Link className="btn btn-light pull-right" to="/">
              <i className="fa fa-arrow-left"></i> Volver
            </Link>
          </h3>

        </div>
        <div className="card-body">
          {
            !loading && <Formik
              initialValues={appartment}
              enableReinitialize={true}
              onSubmit={
                async (values, { setSubmitting, setErrors }) => {
                  try {
                    const cleanValues = _.pick(_.cloneDeep(values), [
                      'location', 'size', 'night', 'month',
                    ]);

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
              render={RenderForm}
            >
            </Formik>
          }

        </div>
      </div>
    );
  }
}
