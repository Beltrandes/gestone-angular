import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultAuthComponent } from './../default-auth/default-auth.component';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [DefaultAuthComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  loginForm: FormGroup
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  toastr = inject(ToastrService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  showSuccessToast(message: string, title: string) {
    this.toastr.success(message, title)
  }

  showErrorToast(message: string, title: string) {
    this.toastr.error(message, title)
  }


  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token)
        this.authService.saveMarbleshopId(response.marbleshopId)
        this.authService.saveUserEmail(response.email)
        this.authService.saveMarbleshopName(response.marbleshopName)
        this.showSuccessToast('Você entrou', 'Sucesso!')
      },
      error: (err) => {
        this.showErrorToast('Tente novamente mais tarde', 'Algo deu errado!')
        console.log(err)
      },
      complete: () => {
        const marbeshopId = this.authService.getMarbleshopId()
        this.router.navigate([`/${marbeshopId}/painel`])
      }
    })
  }
}
