import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICedula } from '../../interfaces/cedula/cedula';

@Injectable({
  providedIn: 'root'
})
export class CedulaService {

  private BASE_URL_API = environment.URL_API_CEDULA;

  constructor(private http: HttpClient) { }
  
  GetPersonByCedula(cedula): Observable<ICedula> {
    return this.http.get<ICedula>(this.BASE_URL_API + "/" + cedula);
  }
}
