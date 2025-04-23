import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MarbleshopMaterial } from '../domain/MarbleshopMaterial';
import { Observable } from 'rxjs';
import { MiscellaneousMaterial } from '../domain/MiscellaneousMaterial';

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

  getAllMiscellaneousMaterials(): Observable<MiscellaneousMaterial[]> {
    return this.http.get<MiscellaneousMaterial[]>(`${this.apiUrl}/miscellaneous`)
  }

  saveMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial): Observable<MarbleshopMaterial> {
    if (marbleshopMaterial.id) {
      return this.updateMarbleshopMaterial(marbleshopMaterial)
    }
    return this.createMarbleshopMaterial(marbleshopMaterial)
  }

  private createMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial): Observable<MarbleshopMaterial> {
    return this.http.post<MarbleshopMaterial>(`${this.apiUrl}/marbleshop`, marbleshopMaterial)
  }

  private updateMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial): Observable<MarbleshopMaterial> {
    return this.http.put<MarbleshopMaterial>(`${this.apiUrl}/marbleshop/${marbleshopMaterial.id}`, marbleshopMaterial)
  }

  saveMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial): Observable<MiscellaneousMaterial> {
    if (miscellaneousMaterial.id) {
      return this.updateMiscellaneousMaterial(miscellaneousMaterial)
    }
    return this.createMiscellaneousMaterial(miscellaneousMaterial)
  }

  private createMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial): Observable<MiscellaneousMaterial> {
    return this.http.post<MiscellaneousMaterial>(`${this.apiUrl}/miscellaneous`, miscellaneousMaterial)
  }

  private updateMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial): Observable<MiscellaneousMaterial> {
    return this.http.put<MiscellaneousMaterial>(`${this.apiUrl}/miscellaneous/${miscellaneousMaterial.id}`, miscellaneousMaterial)
  }


}
