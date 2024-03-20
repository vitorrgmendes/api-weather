import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { WeatherInformationComponent } from './weather-information/weather-information.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CitySelectorComponent, WeatherInformationComponent, WeatherDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Get Weather Live';
}