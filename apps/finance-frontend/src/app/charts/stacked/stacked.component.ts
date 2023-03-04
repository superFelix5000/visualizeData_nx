import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BankDataQuery } from '../../state/bank.data.query';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Category, CategoryColorMap, MONTHS } from '@finanzor/types';

@Component({
  selector: 'app-stacked',
  templateUrl: './stacked.component.html',
  styleUrls: ['./stacked.component.scss'],
})
export class StackedComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  myCanvas: ElementRef<HTMLCanvasElement>;
  private myChart: Chart;

  constructor(private bankDataQuery: BankDataQuery) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const data = {
      labels: MONTHS,
      datasets: [],
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
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
      },
    };

    this.myChart = new Chart(
      this.myCanvas.nativeElement.getContext('2d'),
      config
    );

    this.bankDataQuery.selectAllEntriesPerSelectedYear$.subscribe((entries) => {
      this.myChart.data.datasets = [];
      for (const key in Category) {
        const monthValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++) {
          monthValues[i] = entries
            .filter((entry) => entry.paymentDate.month === i + 1)
            .filter((entry) => entry.category === Category[key])
            .map((entry) => entry.amount)
            .reduce((a, b) => a + b, 0);
        }
        this.myChart.data.datasets.push({
          data: monthValues,
          backgroundColor: CategoryColorMap.get(Category[key]),
          label: key,
        });
      }
      this.myChart.update();
    });
  }

  onChartClick(e) {
    // TODO: implement?
  }
}
