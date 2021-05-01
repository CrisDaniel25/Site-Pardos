import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IRol } from '../../interfaces/rol/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetRol(): Observable<IRol[]> {
    return this.http.get<IRol[]>(this.BASE_URL_API + "/Rol");
  }

  CreateRol(Rol): Observable<IRol> {
    return this.http.post<IRol>(this.BASE_URL_API + "/Rol", Rol, this.httpOptions);
  }

  DeleteRol(RolId: number): Observable<IRol> {
    return this.http.delete<IRol>(this.BASE_URL_API + "/Rol/byId/" + RolId);
  }

  EditRol(RolId: number, Rol): Observable<IRol> {
    return this.http.put<IRol>(this.BASE_URL_API + "/Rol/" + RolId, Rol, this.httpOptions);
  }
}
