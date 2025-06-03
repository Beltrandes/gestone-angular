import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  showNavbar = true;
  private readonly hiddenRoutes = ['/login', '/register'];
  marbleshopName: string | null = null

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.marbleshopName = authService.getMarbleshopName()
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const isAuthRoute = this.hiddenRoutes.includes(event.url);
        const isLoggedIn = !!this.authService.getToken();
        this.showNavbar = isLoggedIn && !isAuthRoute;
      });
  }
}
