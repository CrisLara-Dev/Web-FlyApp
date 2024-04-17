import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'http';
import { API_RENIEC } from 'src/app/config/api-reniec.config';

@Injectable({
  providedIn: 'root'
})
export class ApiReniecService {

constructor( private http: HttpClient, private router: Router) { }

getDni(dni: string) {
  return this.http.get(`${API_RENIEC.baseUrl}?numero=${dni}`, {
    headers: {
      Authorization: `Bearer ${API_RENIEC.authtoken}`
    }
  });
}
}
