import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListComponent } from './entry-list.component';

describe('EntryListPageComponent', () => {
    let component: EntryListComponent;
    let fixture: ComponentFixture<EntryListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EntryListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
