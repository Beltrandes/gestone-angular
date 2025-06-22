import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-default-auth',
    imports: [MatButtonModule],
    templateUrl: './default-auth.component.html',
    styleUrl: './default-auth.component.sass'
})
export class DefaultAuthComponent {

  title = input('')
  primaryBtnText = input('')
  secondaryBtnText = input('')
  login = output<boolean>()

  submitLogin() {
    this.login.emit(true)
  }
}
