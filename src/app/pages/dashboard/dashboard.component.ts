import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, ControllerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {

}
