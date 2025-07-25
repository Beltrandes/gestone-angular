import { Component, input, output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-controller',
    imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatTooltipModule],
    templateUrl: './controller.component.html',
    styleUrl: './controller.component.sass'
})
export class ControllerComponent {
  controllerTitle = input()
  controllerIconText = input()
  matTooltipText = input()
  add = output()
  search = output<string>()

  emitAdd() {
    this.add.emit()
  }

  emitSearchString(searchString: string) {
    this.search.emit(searchString)
  }
}
