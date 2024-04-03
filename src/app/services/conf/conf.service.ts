import { Injectable } from '@angular/core';
import { API_CONFIG } from '../..//config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Agrega esta línea para importar Observable

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de tipos de documento
  listarTiposDocumento(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}TipoDocumento/`);
  }

  listarTiposPago(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}TipoPago/`);
  }

  listarVuelos(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}Vuelo/`);
  }
}

