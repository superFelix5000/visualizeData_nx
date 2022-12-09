import { BankDataEntry } from '../shared/bank-data-entry';
import { RecipientCategory } from './recipient-category';

export type BankDataFetchServerData = {
    success: boolean;
    data: BankDataEntry[];
};

export type CategoryMapFetchServerData = {
    success: boolean;
    data: RecipientCategory[];
};

export type CategoryMapSendServerResponse = {
    success: boolean;
};
