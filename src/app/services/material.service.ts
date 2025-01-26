import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MarbleshopMaterial } from '../domain/MarbleshopMaterial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  public readonly apiUrl = "http://localhost:8080/api/v1/material"
  constructor() { }
  http = inject(HttpClient)

  getAllMarbleshopMaterials(): Observable<MarbleshopMaterial[]> {
    return this.http.get<MarbleshopMaterial[]>(`${this.apiUrl}/marbleshop`)
  }


}
