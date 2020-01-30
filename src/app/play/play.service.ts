import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  url = 'https://localhost:44308/api/campeoes';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getAllChampions(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getImageChampion(full: string): Observable<any> {
    return this.http.get<any>(this.url + '/image', {
      params: {
        full
      }
    })
  }

  getAllImages(fulls: string[]): Observable<any[]> {
    return this.http.post<any[]>(this.url + '/images', fulls)
  }
}
