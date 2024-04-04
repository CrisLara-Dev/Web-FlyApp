import { Injectable } from '@angular/core';
import { API_CONFIG } from '../..//config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Agrega esta línea para importar Observable

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  constructor(private http: HttpClient) { }

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
    return this.http.get<any>(`${API_CONFIG.baseUrl}Vuelo/`);
  }

  eliminarVuelos(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}Vuelo/${id}/`);
  }  

  crearVuelo(vueloData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}Vuelos/`, vueloData);
  }

  //CRUD PROMOCIONES
  listarPromocion(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}Descuento/`);
  }

  eliminarPromocion(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}Descuento/${id}/`);
  }  

  //CRUD CANAL VENTA
  listarCanal(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}CanalVenta/`);
  }

  eliminarCanal(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}CanalVenta/${id}/`);
  }  
}

