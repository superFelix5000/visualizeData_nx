import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListPageComponent } from './entry-list-page.component';

describe('EntryListPageComponent', () => {
    let component: EntryListPageComponent;
    let fixture: ComponentFixture<EntryListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EntryListPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
