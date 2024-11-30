import { Component, input, output } from '@angular/core';

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
  add = output()
  search = output<string>()

  emitAdd() {
    this.add.emit()
  }

  emitSearchString(searchString: string) {
    this.search.emit(searchString)
  }
}
