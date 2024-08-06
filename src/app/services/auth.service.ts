import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../shared/model/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiUrl}?username=${username}&password=${password}`
    );
  }

  register(registerData: Register): Observable<any> {
    console.log("🚀 ~ AuthService ~ register ~ registerData:", registerData)
    return this.http.post<any>(this.apiUrl, registerData);
  }
}
