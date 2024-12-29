import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  private baseUrl = 'https://api.balldontlie.io/v1';
  private apiKey = '9ae221b9-35f1-4f7c-a42e-8a227a0b5ee2'; // Your actual API key

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.apiKey,
    });
  }

  getPlayers(cursor: string = '0', perPage: number = 25, search: string = ''): Observable<any> {
    const url = `${this.baseUrl}/players?cursor=${cursor}&per_page=${perPage}${search ? `&search=${search}` : ''}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
  
  getTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams`, {
      headers: this.getHeaders(),
    });
  }


  getGames(cursor: string = '0', perPage: number = 25, startDate: string = '', endDate: string = ''): Observable<any> {
    let url = `${this.baseUrl}/games?cursor=${cursor}&per_page=${perPage}`;
    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}  
