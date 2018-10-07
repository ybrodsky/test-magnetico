import * as React from 'react';
import { Formik } from 'formik';
import * as _ from 'lodash';
import { Input } from './../Shared/BsInput';

const RenderForm = ({
  values,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        label="Nombre de usuario"
        type="text"
        name="username"
        onChange={handleChange}
        value={values.username}
        errors={errors}
      />
      <p className="help-block">
        Cualquier nombre de usuario. Si no existe, lo crea.
      </p>
      <div className="form-group">
        <button type="submit" className="btn btn-block btn-dark" disabled={isSubmitting}>
          INGRESAR
        </button>
      </div>
    </form>
  );
}

export default class TestForm extends React.Component {
  render() {
    const { onSubmit, username } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mb-5">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fa fa-lock"></i> Iniciar sesion
              </h3>
            </div>
            <div className="card-body">
              {
                <Formik
                  initialValues={{ username }}
                  enableReinitialize={true}
                  onSubmit={
                    async (values, { setSubmitting, setErrors }) => {
                      try {
                        await onSubmit(values);

                        setSubmitting(false);
                      } catch (err) {console.log(err);
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
        </div>
      </div>
    );
  }
}
