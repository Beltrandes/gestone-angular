import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';

@Component({
  selector: 'app-dashboard',
  imports: [ControllerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {

}
