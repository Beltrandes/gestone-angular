import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MarbleshopMaterial } from '../domain/MarbleshopMaterial';
import { Observable } from 'rxjs';
import { MiscellaneousMaterial } from '../domain/MiscellaneousMaterial';
import { UpdateMaterialPrice } from '../domain/UpdateMaterialPrice';

@Injectable({
  providedIn: 'root'
})
export class MarbleshopMaterialService {
  public readonly apiUrl = "http://localhost:8080/api/v1/material"
  constructor() { }
  http = inject(HttpClient)

  getAllMarbleshopMaterials(): Observable<MarbleshopMaterial[]> {
    return this.http.get<MarbleshopMaterial[]>(this.apiUrl)
  }

  saveMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial): Observable<MarbleshopMaterial> {
    if (marbleshopMaterial.id) {
      return this.updateMarbleshopMaterial(marbleshopMaterial)
    }
    return this.createMarbleshopMaterial(marbleshopMaterial)
  }

  private createMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial): Observable<MarbleshopMaterial> {
    return this.http.post<MarbleshopMaterial>(this.apiUrl, marbleshopMaterial)
  }

  private updateMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial): Observable<MarbleshopMaterial> {
    return this.http.put<MarbleshopMaterial>(`${this.apiUrl}/${marbleshopMaterial.id}`, marbleshopMaterial)
  }

  updateMarbleshopMaterialPrice(updateMaterialPriceDTO: UpdateMaterialPrice): Observable<MarbleshopMaterial> {
    return this.http.patch<MarbleshopMaterial>(`${this.apiUrl}/update/price`, updateMaterialPriceDTO)
  }

  deleteMarbleshopMaterial(marbleshopMaterialId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${marbleshopMaterialId}`)
  }
}
