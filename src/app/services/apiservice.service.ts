import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }
  httpGetRegistroCivil(api: string) {
    return this.http.get(`${environment.urlRegistrocivil}${api}`);
  }
}
