import { Injectable } from '@angular/core';
import { API_CONFIG } from '../..//config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Agrega esta línea para importar Observable
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfService {
  encryptId(id: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) { // Genera una cadena de 10 caracteres
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  decryptId(encryptedId: string): number {
    // En este ejemplo, no implementamos la función de desencriptación, ya que no necesitas desencriptar la cadena de letras y números
    // Si necesitas la funcionalidad de desencriptación en el futuro, debes implementarla aquí
    return 0;
  }
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

  //CRUD CANAL VENTA
  listarCanal(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}CanalVenta/`);
  }

  eliminarCanal(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}CanalVenta/${id}/`);
  }  

}

