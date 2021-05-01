import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ISponsors } from '../../interfaces/sponsors/sponsors';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  private BASE_URL_API = environment.URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  GetSponsor(): Observable<ISponsors[]> {
    return this.http.get<ISponsors[]>(this.BASE_URL_API + "/Sponsors");
  }

  CreateSponsor(Sponsor): Observable<ISponsors> {
    return this.http.post<ISponsors>(this.BASE_URL_API + "/Sponsors", Sponsor, this.httpOptions);
  }

  DeleteSponsor(SponsorId: number): Observable<ISponsors> {
    return this.http.delete<ISponsors>(this.BASE_URL_API + "/Sponsors/byId/" + SponsorId);
  }

  EditSponsor(SponsorId: number, Sponsor): Observable<ISponsors> {
    return this.http.put<ISponsors>(this.BASE_URL_API + "/Sponsors/" + SponsorId, Sponsor, this.httpOptions);
  }

  UploadMultimediaFile(File: FormData) {
    return this.http.post(this.BASE_URL_API + "/Sponsors/Upload", File);
  }
}
