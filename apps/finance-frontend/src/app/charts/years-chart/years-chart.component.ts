import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BankDataQuery } from '../..//state/bank.data.query';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BankDataService } from '../..//state/bank.data.service';
import { YEARS } from '@finanzor/types';

@Component({
  selector: 'app-years-chart',
  templateUrl: './years-chart.component.html',
  styleUrls: ['./years-chart.component.scss'],
})
export class YearsChartComponent implements OnInit {
    @ViewChild('canvas', { static: true })
    myCanvas: ElementRef<HTMLCanvasElement>;

    private labels = YEARS;

    private myChart: Chart;

    private config: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: this.labels,
            datasets: [],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
        plugins: [ChartDataLabels],
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

        this.bankDataQuery.selectYearTotals$.subscribe((yearTotals) => {
            this.myChart.data.datasets = [];
            const plusValues = yearTotals.map((value) => value.plus);
            const minusValues = yearTotals.map((value) => value.minus);
            const addedValues = yearTotals.map(
                (value) => value.plus + value.minus
            );

            this.myChart.data.datasets.push({
                backgroundColor: '#7a9e54',
                data: plusValues,
                stack: '1',
                datalabels: {
                    display: false,
                },
            });

            this.myChart.data.datasets.push({
                backgroundColor: '#ab5349',
                data: minusValues,
                stack: '1',
                datalabels: {
                    display: false,
                },
            });

            this.myChart.data.datasets.push({
                backgroundColor: '#3c6591',
                data: addedValues,
                stack: '2',
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: Math.round,
                    font: {
                        weight: 'bold',
                    },
                },
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
            const year = YEARS[items[0].index];
            this.bankDataService.setYear(year);
            this.bankDataService.setMonth(null);
            this.bankDataService.setCategory(null);
        }
    }
}
