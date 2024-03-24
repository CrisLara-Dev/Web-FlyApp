import { Component, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import { AuthService } from "src/app/services/auth/auth.service";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { privateDecrypt } from "crypto";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {
    this.datasets = [[0, 20, 10, 30, 15, 40, 20, 60]];
    this.data = this.datasets[0];
    var chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());
    this.isAuthenticated();
    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });

    const labels = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const data = [10, 20, 15, 25, 30, 60, 15, 70, 30, 20, 15, 50];

    // Modifica la configuración del gráfico de barras
    const ctxBar = document.getElementById(
      "graficoLineal"
    ) as HTMLCanvasElement;
    const graficoBar = new Chart(ctxBar, {
      type: "bar", // Cambia el tipo de gráfico a 'bar'
      data: {
        labels: labels,
        datasets: [
          {
            label: "Ventas Mensuales",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo de las barras
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Meses",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Ventas",
            },
          },
        },
      },
    });

    // Gráfico Pastel
    const ctxPastel = document.getElementById(
      "graficoPastel"
    ) as HTMLCanvasElement;
    const graficoPastel = new Chart(ctxPastel, {
      type: "pie",
      data: {
        labels: ["Efectivo", "Tarjeta", "Yape", "Plin"],
        datasets: [
          {
            data: [25, 20, 30, 25],
            backgroundColor: ["#fc466b", "#3f5efb", "#fcb045", "#39d2c0"],
          },
        ],
      },
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  seleccionOpcion: string = ""; // Variable para almacenar la opción seleccionada
  anios: number[] = []; // Arreglo para almacenar los años disponibles

  constructor(private authService: AuthService) {
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
  isAuthenticated() {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
  logout() {
    this.authService.logout();
  }
}
