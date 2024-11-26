import { Component, input } from '@angular/core';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [],
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.sass'
})
export class ControllerComponent {
  controllerTitle = input()
  controllerIconText = input()
  controllerPrimaryButtonText = input()
}
