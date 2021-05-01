import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IPlayers } from '../../interfaces/players/players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetPlayers(): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(this.BASE_URL_API + "/Players");
  }

  CreatePlayers(Players): Observable<IPlayers> {
    return this.http.post<IPlayers>(this.BASE_URL_API + "/Players", Players, this.httpOptions);
  }

  DeletePlayers(PlayersId: number): Observable<IPlayers> {
    return this.http.delete<IPlayers>(this.BASE_URL_API + "/Players/byId/" + PlayersId );
  }

  EditPlayers(PlayersId: number, Players) {
    return this.http.put<IPlayers>(this.BASE_URL_API + "/Players/" + PlayersId, Players, this.httpOptions);
  }

  UploadMultimediaFile(File: FormData) {
    return this.http.post(this.BASE_URL_API + "/Players/Upload", File);
  }
}
