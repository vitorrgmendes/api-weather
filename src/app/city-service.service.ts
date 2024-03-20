import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private apiKey = '7ac0e3062551fcc363cff0094f6cef0a';

  public weather: Weather = new Weather();

  constructor(private http: HttpClient) {}

  // API
  getCityWeather(cityName: string): Observable<any> 
  {
    const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  // POST CITY
  postCity(city: string): Weather 
  {
    this.clearData()
    this.getCityWeather(city).subscribe(
      (response: any) => 
      {
        if (response.weather && response.weather.length > 0) 
        {          
          // Main Infos
          this.weather.main = `Weather: ${response.weather[0].main}.`;
          this.weather.weather = `Detailed Weather: ${response.weather[0].description}.`;
          this.weather.temperature = `Current Temperature: ${(response.main.temp - 273.15).toFixed(1)} °C`;   

          // More Details
          this.weather.minTemperature = `Min. Temperature: ${(response.main.temp_min - 273.15).toFixed(1)} °C`;
          this.weather.maxTemperature = `Max. Temperature: ${(response.main.temp_max - 273.15).toFixed(1)} °C`;
          this.weather.pressureHPA = `Pressure: ${response.main.pressure} hPa`;
          this.weather.humidityPercent = `Humidity: ${response.main.humidity}%`;
          this.weather.windSpeedMetersPerSecond = `Wind Speed: ${(response.wind.speed * 3.6).toFixed(1)} Km/h`;
        } 
        else 
        {          
          this.weather.weather = 'No weather data found.';
        }
      },
      () => {
        this.weather.weather = 'City not found!';
      }
    );
    return this.weather;  
  }

  // Clear object Weather
  clearData(): void 
  {
    // Clear Main Infos
    this.weather.main = null;
    this.weather.weather = null;
    this.weather.temperature = '';

    // Clear More Details
    this.weather.minTemperature = '';
    this.weather.maxTemperature = '';
    this.weather.pressureHPA = '';
    this.weather.humidityPercent = '';
    this.weather.windSpeedMetersPerSecond = '';
  }

  private triggerGetWeatherSource = new Subject<void>();
  triggerGetWeather$ = this.triggerGetWeatherSource.asObservable();
  triggerGetWeather() {
    this.triggerGetWeatherSource.next();
  }

  private triggerGetWeatherDetailsSource = new Subject<void>();
  triggerGetWeatherDetails$ = this.triggerGetWeatherDetailsSource.asObservable();
  triggerGetWeatherDetails() {
    this.triggerGetWeatherDetailsSource.next();
  }

  private triggerViewWeatherDetailsSource = new Subject<void>();
  triggerViewWeatherDetails$ = this.triggerViewWeatherDetailsSource.asObservable();
  triggerViewWeatherDetails() {
    this.triggerViewWeatherDetailsSource.next();
  }
}

export class Weather {
  main: string | null = null;
  weather: string | null = null;
  temperature: string | null = null;
  minTemperature: string | null = null;
  maxTemperature: string | null = null;
  pressureHPA: string | null = null;
  humidityPercent: string | null = null;
  windSpeedMetersPerSecond: string | null = null;
}