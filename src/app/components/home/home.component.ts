import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
