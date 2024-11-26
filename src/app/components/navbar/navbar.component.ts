import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  marbleshopName = input('Gestone')
  marbleshopId: string | null = null
  constructor(private readonly authService: AuthService) {
    this.marbleshopId = authService.getMarbleshopId()
    console.log(this.marbleshopId)
  }
}
