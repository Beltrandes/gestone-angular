import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  marbleshopName: string | null = null
  marbleshopId: string | null = null
  constructor(authService: AuthService) {
    this.marbleshopId = authService.getMarbleshopId()
    this.marbleshopName = authService.getMarbleshopName()
    console.log(this.marbleshopName)
  }
}
