import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService, Weather } from '../city-service.service';

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
  public weather: Weather = new Weather();

  constructor(private cityService: CityService) {}

  postCity(): void 
  {    
    this.weather = this.cityService.postCity(this.city);
    this.cityService.triggerGetWeather();
  }
}