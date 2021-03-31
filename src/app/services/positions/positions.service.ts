import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IPositions } from 'src/app/interfaces/positions/positions';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetPositions(): Observable<IPositions[]> {
    return this.http.get<IPositions[]>(this.BASE_URL_API + "/Positions");
  }

  CreatePositions(Positions): Observable<IPositions[]> {
    return this.http.post<IPositions[]>(this.BASE_URL_API + "/Positions", Positions, this.httpOptions);
  }

  DeletePositions(PositionsId: number): Observable<IPositions> {
    return this.http.delete<IPositions>(this.BASE_URL_API + "/Positions/" + PositionsId );
  }

  EditPositions() {

  }
}
