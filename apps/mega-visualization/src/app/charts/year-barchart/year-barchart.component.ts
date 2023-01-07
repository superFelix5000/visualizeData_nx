import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BankDataQuery } from '../../state/bank.data.query';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BankDataService } from '../../state/bank.data.service';
import { MONTHS } from '@finanzor/types';

@Component({
    selector: 'app-year-barchart',
    templateUrl: './year-barchart.component.html',
    styleUrls: ['./year-barchart.component.scss'],
})
export class YearBarchartComponent implements OnInit {
    @ViewChild('canvas', { static: true })
    myCanvas: ElementRef<HTMLCanvasElement>;

    private myChart: Chart;

    private config: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: [],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            responsive: true,
        },
    };

    constructor(
        private bankDataQuery: BankDataQuery,
        private bankDataService: BankDataService
    ) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.myChart = new Chart(
            this.myCanvas.nativeElement.getContext('2d'),
            this.config
        );

        this.bankDataQuery.selectCurrentMonthValues$.subscribe((values) => {
            this.myChart.data.datasets = [];
            this.myChart.data.datasets.push({
                backgroundColor: '#3c6591',
                data: values,
            });
            this.myChart.update();
        });
    }

    onChartClick(e) {
        const items = this.myChart.getElementsAtEventForMode(
            e,
            'nearest',
            { intersect: true },
            true
        );
        if (items && items.length === 1) {
            this.bankDataService.setMonth(items[0].index + 1);
            this.bankDataService.setCategory(null);
        }
    }
}
