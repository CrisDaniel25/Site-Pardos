import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUsers } from '../../interfaces/users/users';
import { ILogin } from '../../interfaces/login/login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.BASE_URL_API + "/Authentication");
  }

  CreateNewUser(UserObject): Observable<IUsers[]> {
    return this.http.post<IUsers[]>(this.BASE_URL_API + "/Authentication/Register/User", UserObject, this.httpOptions);
  }
  
  Verify(Login): Observable<ILogin> {
    return this.http.post<ILogin>(this.BASE_URL_API + "/Authentication/Login/User", Login, this.httpOptions);
  }

  GetRolbyUser(Rol: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.BASE_URL_API + "/Authentication/byUsernameGetRol/" + Rol);
  }

  GetUserbyUsername(Username: string): Observable<IUsers> {
    return this.http.get<IUsers>(this.BASE_URL_API + "/Authentication/byUsername/" + Username);
  }

  DeleteUser(userId: number): Observable<IUsers> {
    return this.http.delete<IUsers>(this.BASE_URL_API + "/Authentication/" + userId);
  }
}
