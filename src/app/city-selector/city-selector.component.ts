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
export class CitySelectorComponent {
  private cityService: CityService;

  city: string = '';
  weather: string | null = null;

  constructor(private cityServiceInstance: CityService) {
    this.cityService = cityServiceInstance;
  }

  getWeather(): void {
    this.cityService.getCityWeather(this.city).subscribe(
      (response: any) => {
        // Handle the response here
        console.log('Response:', response);

        // Extract weather information
        if (response.weather && response.weather.length > 0) {
          this.weather = response.weather[0].description;
          console.log('Weather Description:', this.weather);
        } else {
          console.warn('No weather data found.');
        }
      },
      (error: any) => {
        console.error('Error fetching city data:', error);
      }
    );
  }
}
