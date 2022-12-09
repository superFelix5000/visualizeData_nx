import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearBarchartComponent } from './year-barchart.component';

describe('YearBarchartComponent', () => {
    let component: YearBarchartComponent;
    let fixture: ComponentFixture<YearBarchartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [YearBarchartComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(YearBarchartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
