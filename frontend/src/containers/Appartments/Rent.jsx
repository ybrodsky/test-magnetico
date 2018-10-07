import * as React from 'react';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import * as Api from 'api';
import * as moment from 'moment';
import RentForm from 'components/Rent/form';

export default class AppartmentsRentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appartmentId: this.props.match.params.appartmentId,
      appartment: {
        location: '',
        size: '',
        night: '',
        month: '',
        userHasDiscount: false,
      },
      rent: {
        appartment_id: this.props.match.params.appartmentId,
        checkin: '',
        checkout: '',
        discount: 0,
        subtotal: 0,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.calculatePriceAndDiscount = this.calculatePriceAndDiscount.bind(this);

    this.getAppartment();
  }

  calculatePriceAndDiscount(data) {console.log(data);
    const nights = moment(data.checkout, 'DD-MM-YYYY')
      .diff(moment(data.checkin, 'DD-MM-YYYY'), 'days');

    if (!data.checkin || !data.checkout || nights <= 0) {
      return { discount: 0, subtotal: 0 };
    }

    let percentageDiscount = 0;

    if (nights > 4) {
      percentageDiscount = 5;
    }

    if (nights > 15) {
      percentageDiscount = 15;
    }

    if (this.state.appartment.userHasDiscount) {
      percentageDiscount += 5;
    }

    const monthsOfRent = Math.floor(nights / 30);
    const daysOfRent = nights % 30;

    const rentedMonths = (monthsOfRent * this.state.appartment.month);
    const rentedDays = (daysOfRent * this.state.appartment.night);

    const subtotal = rentedMonths + rentedDays;
    const discount = percentageDiscount * subtotal / 100;

    console.log(subtotal, discount);
    return { discount, subtotal };
  }

  async getAppartment() {
    const { data } = await Api.getAppartment(this.state.appartmentId);

    this.setState({ appartment: data });
  }

  async onSubmit(body) {
    await Api.createRent(body);

    toast.success(`El registro fue actualizado con éxito`);
    return this.props.history.push('/');
  }

  render() {
    return (
      <RentForm
        onSubmit={this.onSubmit}
        appartment={this.state.appartment}
        rent={this.state.rent}
        calculatePriceAndDiscount={this.calculatePriceAndDiscount}
      />
    );
  }
}
