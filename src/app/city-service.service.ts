import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private apiKey = '7ac0e3062551fcc363cff0094f6cef0a';

  constructor(private http: HttpClient) { }

  getCityWeather(cityName: string): Observable<any> {

    const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}