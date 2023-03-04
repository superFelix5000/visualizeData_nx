export type RecipientCategory = {
  recipient: string;
  category: Category;
};

// TODO: this should be shared between frontend and backend
export enum Category {
  HOBBIES = "HOBBIES",
  WELLBEING = "WELLBEING",
  MOVINGAROUND = "MOVINGAROUND",
  HOLIDAYTRIPS = "HOLIDAYTRIPS",
  OTHER = "OTHER",
  PAYCHECK = "PAYCHECK",
  FOOD = "FOOD",
  ELECTRONICSERVICES = "ELECTRONICSERVICES",
  CLOTHING = "CLOTHING",
  INSURANCES = "INSURANCES",
  ENTERTAINMENT = "ENTERTAINMENT",
  HOMEIMPROVEMENTS = "HOMEIMPROVEMENTS",
  HOME = "HOME",
  CAR = "CAR",
  PUBLICTRANSPORTATION = "PUBLIC TRANSPORTATION",
  INVESTMENTS = "INVESTMENTS",
  CASH = "CASH",
  BAARI = "BAARI",
  CHARITY = "CHARITY",
  ELECTRICITY = 'ELECTRICITY',
  LOAN = 'LOAN',
  MAINTENANCECHARGE = 'MAINTENANCE_CHARGE'
}

export class SimpleDate {
  day: number;
  month: number;
  year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  toString(): string {
    return (
      this.day.toString() +
      "." +
      this.month.toString() +
      "." +
      this.year.toString()
    );
  }
}

export interface BankDataEntry {
  id: string;
  bankaccountid: number;
  postingDate: SimpleDate;
  valueDate: SimpleDate;
  paymentDate: SimpleDate;
  amount: number;
  recipientOrPayer: string;
  accountNumber: number;
  bic: number;
  event: string;
  reference: string;
  payerReference: string;
  message: string;
  cardNumber: number;
  receipt: string;
  category: Category;
}
