import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService, Weather } from '../city-service.service';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent 
{
  weather: Weather = new Weather();
  showDetails = false;

  constructor(private cityService: CityService) 
  {
    this.cityService.triggerGetWeatherDetails$.subscribe(() => 
    {
      this.showWeatherDetails();
    });

    this.cityService.triggerViewWeatherDetails$.subscribe(() => {
      this.moreDetails();
    });
  }

  showWeatherDetails() 
  {
    this.showDetails = false;
    this.weather = this.cityService.weather;
  }

  moreDetails(): void 
  {
    if (this.weather.main !== null)
    {
      this.showDetails = !this.showDetails;
    }   
  }  
}
