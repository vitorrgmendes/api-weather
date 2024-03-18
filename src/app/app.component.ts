import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitySelectorComponent } from './city-selector/city-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CitySelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Get Weather Live';
}