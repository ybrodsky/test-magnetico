import * as React from 'react';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import * as Api from 'api';
import AppartmentsForm from 'components/Appartments/form';

export default class AppartmentsAddContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appartment: {
        location: '',
        size: '',
        night: '',
        month: '',
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(body) {
    const { data } = await Api.createAppartment(body);

    toast.success(`El registro fue creado con éxito`);
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
