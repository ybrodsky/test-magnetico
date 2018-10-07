const InputErrorClass = ({ errors, name }) => {
  return errors[name] ? 'form-control is-invalid' : 'form-control';
}

export default InputErrorClass;
