import * as moment from 'moment';

export type Appartment = {
  location: string;
  size: number;
  night: number;
  month: number;
};

export default class Rent {
  private appartment: Appartment;
  private appartment_id: number;
  private user_id: number;
  private checkin: string;
  private checkout: string;
  private nights: number;
  private discount: number;
  private subtotal: number;
  private userRentedBefore: boolean;

  constructor({ data, user, appartment, userRentedBefore }) {
    this.appartment = appartment;
    this.userRentedBefore = userRentedBefore;
    this.appartment_id = data.appartment_id;
    this.user_id = user.id;
    this.checkin = data.checkin;
    this.checkout = data.checkout;
    this.nights = moment(this.checkout).diff(moment(this.checkin), 'days');
    this.discount = 0;
    this.subtotal = 0;
  }

  public setDiscount() {
    let percentageDiscount = 0;

    if (this.nights > 4) {
      percentageDiscount = 5;
    }

    if (this.nights > 15) {
      percentageDiscount = 15;
    }

    if (this.userRentedBefore) {
      percentageDiscount += 5;
    }

    this.discount = percentageDiscount * this.subtotal / 100;

    return this;
  }

  public setSubtotal() {
    const monthsOfRent = Math.floor(this.nights / 30);
    const daysOfRent = this.nights % 30;

    const rentedMonths = (monthsOfRent * this.appartment.month);
    const rentedDays = (daysOfRent * this.appartment.night);

    this.subtotal = rentedMonths + rentedDays;

    return this;
  }

  public getData() {
    return {
      appartment_id: this.appartment_id,
      user_id: this.user_id,
      checkin: this.checkin,
      checkout: this.checkout,
      discount: this.discount,
      subtotal: this.subtotal,
    };
  }
}
