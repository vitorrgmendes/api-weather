import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService, Weather } from '../city-service.service';

@Component({
  selector: 'app-weather-information',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-information.component.html',
  styleUrl: './weather-information.component.css'
})
export class WeatherInformationComponent {
  weather: Weather = new Weather();
  showDetails = false;

  constructor(private cityService: CityService) {
    this.cityService.triggerGetWeather$.subscribe(() => {
      this.getWeather();
    });    
  }

  getWeather() 
  {
    this.weather = this.cityService.weather;
    this.cityService.triggerGetWeatherDetails();
  }

  moreDetails(): void 
  {
    this.cityService.triggerViewWeatherDetails();    
  }  
}
