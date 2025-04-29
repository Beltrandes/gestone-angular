import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MiscellaneousMaterial } from '../domain/MiscellaneousMaterial';
import { UpdateMaterialPrice } from '../domain/UpdateMaterialPrice';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousMaterialService {
public readonly apiUrl = "http://localhost:8080/api/v1/miscellaneous-material"
  constructor() { }
  http = inject(HttpClient)

  getAllMiscellaneousMaterials(): Observable<MiscellaneousMaterial[]> {
    return this.http.get<MiscellaneousMaterial[]>(this.apiUrl)
  }

  saveMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial): Observable<MiscellaneousMaterial> {
    if (miscellaneousMaterial.id) {
      return this.updateMiscellaneousMaterial(miscellaneousMaterial)
    }
    return this.createMiscellaneousMaterial(miscellaneousMaterial)
  }

  private createMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial): Observable<MiscellaneousMaterial> {
    return this.http.post<MiscellaneousMaterial>(this.apiUrl, miscellaneousMaterial)
  }

  private updateMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial): Observable<MiscellaneousMaterial> {
    return this.http.put<MiscellaneousMaterial>(`${this.apiUrl}/${miscellaneousMaterial.id}`, miscellaneousMaterial)
  }

  updateMiscellaneousMaterialPrice(updateMaterialPriceDTO: UpdateMaterialPrice): Observable<MiscellaneousMaterial> {
    return this.http.patch<MiscellaneousMaterial>(`${this.apiUrl}/update/price`, updateMaterialPriceDTO)
  }

  deleteMiscellaneousMaterial(miscellaneousMaterialId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${miscellaneousMaterialId}`)
  }
}
