import * as React from 'react';
import InputErrorClass from './InputErrorClass';

export const Input = (props) => {
  const { type, label, name, errors, ...rest } = props;

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        className={InputErrorClass({ errors, name })}
        name={name}
        type={type || 'text'}
        {...rest}
      />
      {errors[name] && <p className="invalid-feedback">{errors[name]}</p>}
    </div>
  );
}

export const Textarea = (props) => {
  const { label, name, errors, ...rest } = props;

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <textarea
        className={InputErrorClass({ errors, name })}
        name={name}
        {...rest}
      >
      </textarea>
      {errors[name] && <p className="invalid-feedback">{errors[name]}</p>}
    </div>
  );
}

export const Checkbox = (props) => {
  const { label, ...rest } = props;

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        {...rest}
      />
      <label className="form-check-label">
        {label}
      </label>
    </div>
  );
}

export const Select = (props) => {
  const { type, label, name, errors, options, ...rest } = props;

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select
        className={InputErrorClass({ errors, name })}
        name={name}
        {...rest}
      >
        <option value="">...</option>
        {
          options.map((option, i) => {
            return (
              <option key={i} value={option.value}>{option.label}</option>
            );
          })
        }
      </select>
      {errors[name] && <p className="invalid-feedback">{errors[name]}</p>}
    </div>
  );
}
