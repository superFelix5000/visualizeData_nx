import { Component } from '@angular/core';
import { BankDataEntry } from '../../shared/bank-data-entry';
import { BankDataService } from '../../state/bank.data.service';

@Component({
    selector: 'app-upload-component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
    entries: BankDataEntry[] = [];

    constructor(private bankDataService: BankDataService) {}

    onFileInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const file: File = target.files[0];
        file.text().then((text) => {
            this.entries =
                this.bankDataService.readBankDataEntriesFromData(text);
        });
    }

    onUpload() {
        this.bankDataService.appendAll(this.entries).subscribe();
    }

    onEntryChanged(changedEntry: Partial<BankDataEntry>) {
        this.entries = this.entries.map((entry) => {
            if (entry.id === changedEntry.id) {
                return { ...entry, category: changedEntry.category };
            } else {
                return entry;
            }
        });
    }
}
