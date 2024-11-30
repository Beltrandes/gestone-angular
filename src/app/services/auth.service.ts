import { MasterRegisterDTO } from './../dtos/MasterRegisterDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../domain/LoginRequest';
import { LoginResponse } from '../domain/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/auth';
  private readonly token: string | null = null;
  private readonly marbleshopId: string | null = null;

  constructor(private readonly http: HttpClient) {}

  verifyMasterEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/register/validate-email`, {
      params: { email },
    });
  }

  masterUserRegister(masterUserRegisterDTO: MasterRegisterDTO) {
    return this.http.post<MasterRegisterDTO>(
      `${this.apiUrl}/register/master`,
      masterUserRegisterDTO
    );
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('marbleshopId');
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  saveMarbleshopId(marbleshopId: string) {
    localStorage.setItem('marbleshopId', marbleshopId);
  }

  getMarbleshopId(): string | null {
    return this.marbleshopId ?? localStorage.getItem('marbleshopId');
  }

  getToken(): string | null {
    return this.token ?? localStorage.getItem('jwtToken');
  }
}
