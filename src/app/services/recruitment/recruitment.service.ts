import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecruitment } from 'src/app/interfaces/recruitment/recruitment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  
  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetRecruitment(): Observable<IRecruitment[]> {
    return this.http.get<IRecruitment[]>(this.BASE_URL_API + "/Recruitment");
  }

  SendRecruitment(Recruitment): Observable<IRecruitment> {
    return this.http.post<IRecruitment>(this.BASE_URL_API + "/Recruitment", Recruitment, this.httpOptions);
  }

  UploadMultimediaFile(File: FormData) {
    return this.http.post(this.BASE_URL_API + "/Recruitment/Upload", File);
  }
}
