import * as React from 'react';
import * as _ from 'lodash';
import * as Api from 'api';
import RentsList from 'components/Rent/list';

export default class RentsIndexContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rents: [],
    };

    this.loadRents();
  }

  async loadRents() {
    const { data } = await Api.listRents();

    this.setState({ rents: data });
  }

  render() {
    return (
      <RentsList
        rents={this.state.rents}
      />
    );
  }
}
