import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IBloc } from '../../interfaces/bloc/bloc';

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetBloc(): Observable<IBloc[]> {
    return this.http.get<IBloc[]>(this.BASE_URL_API + "/Bloc");
  }

  CreateBloc(Bloc): Observable<IBloc> {
    return this.http.post<IBloc>(this.BASE_URL_API + "/Bloc", Bloc, this.httpOptions);
  }

  DeleteBloc(BlocId: number): Observable<IBloc> {
    return this.http.delete<IBloc>(this.BASE_URL_API + "/Bloc/byId/" + BlocId );
  }

  EditBloc(BlocId: number, Bloc): Observable<IBloc> {
    return this.http.put<IBloc>(this.BASE_URL_API + "/Bloc/" + BlocId, Bloc, this.httpOptions);
  }

  UploadMultimediaFile(File: FormData) {
    return this.http.post(this.BASE_URL_API + "/Bloc/Upload", File);
  }
}
