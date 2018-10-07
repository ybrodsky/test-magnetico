import * as React from 'react';
import * as _ from 'lodash';
import * as Api from 'api';
import AppartmentsList from 'components/Appartments/list';

export default class AppartmentsIndexContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appartments: [],
    };

    this.loadAppartments();
  }

  async loadAppartments() {
    const { data } = await Api.listAppartments();

    this.setState({ appartments: data });
  }

  render() {
    return (
      <AppartmentsList
        appartments={this.state.appartments}
      />
    );
  }
}
