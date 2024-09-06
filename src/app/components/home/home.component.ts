import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavComponent } from "../nav/nav.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NavComponent,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}


