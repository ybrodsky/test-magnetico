import * as React from 'react';
import { toast } from 'react-toastify';
import * as _ from 'lodash';
import * as Api from 'api';
import LoginForm from 'components/Login/Form';

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(body) {
    const { data } = await Api.login(body);

    localStorage.setItem('token', data.token);
    toast.success(`Sesion iniciada`);

    return this.props.history.push('/');
  }

  render() {
    return (
      <LoginForm
        username={this.state.username}
        onSubmit={this.onSubmit}
      />
    );
  }
}

