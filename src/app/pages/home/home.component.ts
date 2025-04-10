import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CarrouselComponent } from "../../shared/components/carrousel/carrousel.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CarrouselComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
