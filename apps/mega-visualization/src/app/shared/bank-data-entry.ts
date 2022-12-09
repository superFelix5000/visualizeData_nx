import { SimpleDate } from './simple-date';
import { guid } from '@datorama/akita';
import { Category } from './categories';

export type BankDataEntry = {
    id: string;
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
};

export function createBankDataEntry(
    postingDate: SimpleDate,
    valueDate: SimpleDate,
    paymentDate: SimpleDate,
    amount: number,
    recipientOrPayer: string,
    accountNumber: number,
    bic: number,
    event: string,
    reference: string,
    payerReference: string,
    message: string,
    cardNumber: number,
    receipt: string
): BankDataEntry {
    return {
        id: guid(),
        postingDate: postingDate,
        valueDate: valueDate,
        paymentDate: paymentDate,
        amount: amount,
        recipientOrPayer: recipientOrPayer,
        accountNumber: accountNumber,
        bic: bic,
        event: event,
        reference: reference,
        payerReference: payerReference,
        message: message,
        cardNumber: cardNumber,
        receipt: receipt,
        category: Category.OTHER,
    } as BankDataEntry;
}
