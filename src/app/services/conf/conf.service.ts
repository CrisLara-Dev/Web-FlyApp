import { Injectable } from '@angular/core';
import { API_CONFIG } from '../..//config/api.config';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; // Agrega esta línea para importar HttpHeaders
import { Observable } from 'rxjs'; // Agrega esta línea para importar Observable
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators'; // Agrega estas líneas para importar map y catchError

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  constructor(private http: HttpClient , private authService: AuthService) { }

  // CRUD TIPO DOC
  listarTiposDocumento(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}TipoDocumento/`);
  }

  //CRUD TIPO PAGO
  listarTiposPago(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}TipoPago/`);
  }

  //CRUD TIPO VUELO
  listarVuelos(): Observable<any> {
    const token = this.authService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${API_CONFIG.baseUrl}${API_CONFIG.vuelo}` , { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return error;
      })
    );

  }

  eliminarVuelos(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}Vuelo/${id}/`);
  }  

  crearVuelo(vueloData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}Vuelo/`, vueloData);
  }

  obtenerVuelo(id: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}Vuelo/${id}/`);
  }

  editarVuelo(id: number, datos: any): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}Vuelo/${id}/`, datos);
  }

  //CRUD PROMOCIONES
  listarPromocion(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}Descuento/`);
  }

  eliminarPromocion(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}Descuento/${id}/`);
  }  

  crearPromocion(descuentoData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}Descuento/`, descuentoData);
  }

  obtenerPromocion(id: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}Descuento/${id}/`);
  }

  editarPromocion(id: number, datos: any): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}Descuento/${id}/`, datos);
  }

  //CRUD CANAL VENTA
  listarCanal(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}CanalVenta/`);
  }

  eliminarCanal(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}CanalVenta/${id}/`);
  }  

  crearCanal(canalData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}CanalVenta/`, canalData);
  }

  obtenerCanal(id: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}CanalVenta/${id}/`);
  }

  editarCanal(id: number, datos: any): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}CanalVenta/${id}/`, datos);
  }

}

