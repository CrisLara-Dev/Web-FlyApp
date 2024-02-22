import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60],
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre','Noviembre', 'Diciembre'];
    const data = [10, 20, 15, 25, 30, 60, 15, 70, 30, 20, 15, 50];

    // Configuración del gráfico lineal
    const ctxLineal = document.getElementById('graficoLineal') as HTMLCanvasElement;
    const graficoLineal = new Chart(ctxLineal, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas Mensuales',
          data: data,
          fill: false,  // Para que sea una línea sin rellenar
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Meses'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Ventas'
            }
          }
        }
      }
    });

     // Gráfico Pastel
     const ctxPastel = document.getElementById('graficoPastel') as HTMLCanvasElement;
     const graficoPastel = new Chart(ctxPastel, {
       type: 'pie',
       data: {
         labels: ['Efectivo', 'Tarjeta', 'Yape', 'Plin'],
         datasets: [{
           data: [25, 25, 20,30],
           backgroundColor: ['#fc466b', '#3f5efb', '#fcb045','#39d2c0']
         }]
       }
     });
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  seleccionOpcion: string = ''; // Variable para almacenar la opción seleccionada
  anios: number[] = []; // Arreglo para almacenar los años disponibles

  constructor() {
    // Obtener el año actual
    const anioActual = new Date().getFullYear();

    // Generar opciones de años desde el año actual hasta 100 años atrás
    for (let i = anioActual; i >= anioActual - 100; i--) {
      this.anios.push(i);
    }
  }

  onOpcionSeleccionada(event: any) {
    this.seleccionOpcion = event.target.value;
  }

}
