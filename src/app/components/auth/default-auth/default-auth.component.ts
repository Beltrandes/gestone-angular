import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-default-auth',
  standalone: true,
  imports: [],
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
