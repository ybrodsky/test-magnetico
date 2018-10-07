import * as React from 'react';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import * as Api from 'api';
import AppartmentsForm from 'components/Appartments/form';

export default class AppartmentsEditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appartmentId: this.props.match.params.appartmentId,
      appartment: {
        location: '',
        size: '',
        night: '',
        month: '',
      },
    };

    this.onSubmit = this.onSubmit.bind(this);

    this.getAppartment();
  }

  async getAppartment() {
    const { data } = await Api.getAppartment(this.state.appartmentId);

    this.setState({ appartment: data });
  }

  async onSubmit(body) {
    const { data } = await Api.updateAppartment(this.state.appartmentId, body);

    toast.success(`El registro fue actualizado con éxito`);
    return this.props.history.push('/');
  }

  render() {
    return (
      <AppartmentsForm
        onSubmit={this.onSubmit}
        appartment={this.state.appartment}
      />
    );
  }
}
