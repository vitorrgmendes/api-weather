import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService } from '../city-service.service';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './city-selector.component.html',
  styleUrl: './city-selector.component.css'
})
export class CitySelectorComponent 
{
  title = 'Live Weather';
  city: string = '';
  main: string | null = null;
  weather: string | null = null;
  temperature: string | null = null;

  minTemperature: string | null = null;
  maxTemperature: string | null = null;
  pressureHPA: string | null = null;
  humidityPercent: string | null = null;
  windSpeedMetersPerSecond: string | null = null;

  constructor(private cityService: CityService) {
  }

  getWeather(): void {
    this.cityService.getCityWeather(this.city).subscribe(
      (response: any) => 
      {
        if (response.weather && response.weather.length > 0) {
          this.showDetails = false;
          
          // Main Infos
          this.main = `Weather: ${response.weather[0].main}.`;
          this.weather = `Detailed Weather: ${response.weather[0].description}.`;
          this.temperature = `Current Temperature: ${(response.main.temp - 273.15).toFixed(1)} °C`;   

          // More Details
          this.minTemperature = `Min. Temperature: ${(response.main.temp_min - 273.15).toFixed(1)} °C`;
          this.maxTemperature = `Max. Temperature: ${(response.main.temp_max - 273.15).toFixed(1)} °C`;
          this.pressureHPA = `Pressure: ${response.main.pressure} hPa`;
          this.humidityPercent = `Humidity: ${response.main.humidity}%`;
          this.windSpeedMetersPerSecond = `Wind Speed: ${response.wind.speed} m/s`;

        } else {
          this.clearData()
          this.weather = 'No weather data found.';
        }
      },
      () => {
        this.clearData()
        this.weather = 'City not found!';
      }
    );
  }

  showDetails = false;
  moreDetails(): void {
    if (this.weather !== null)
    {
      this.showDetails = !this.showDetails;
    }    
  }

  clearData(): void 
  {
    this.showDetails = false;

    // Clear Main Infos
    this.main = '';
    this.weather = null;
    this.temperature = '';

    // Clear More Details
    this.minTemperature = '';
    this.maxTemperature = '';
    this.pressureHPA = '';
    this.humidityPercent = '';
    this.windSpeedMetersPerSecond = '';
  }
}
