import { MasterRegisterDTO } from './../../../dtos/MasterRegisterDTO';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.sass'
})
export class RegisterComponent {
  registerForm: FormGroup
  isProcessing = false

  isEmailVerified = false
  isUserInfosFilled = false

  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userDetails: this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
      marbleshopDetails: this.fb.group({
        marbleshopName: ['', Validators.required],
        marbleshopEmail: ['', [Validators.required, Validators.email]],
        marbleshopPhone: ['', Validators.required],
      }),
    });

  }

  verifyEmail() {
    const email = this.registerForm.get('email')?.value;

    this.authService.verifyMasterEmail(email).subscribe({
      next: (result) => {
        this.isProcessing = true
        setTimeout(() => {
          this.isProcessing = false
          this.isEmailVerified = result
        }, 2000)
      }
    })
  }

  enableMarbleshopDetails() {
    if (this.registerForm.get('userDetails')?.valid) {
      this.registerForm.get('marbleshopDetails')?.enable();
      this.isUserInfosFilled = true

    } else {
      alert('Preencha os dados do usuário antes de prosseguir.');
    }
  }

  onSubmit() {
    const data: MasterRegisterDTO = {
      name: this.registerForm.get('userDetails')?.value['name'],
      email: this.registerForm.value['email'],
      password: this.registerForm.get('userDetails')?.value['password'],
      phone: this.registerForm.get('userDetails')?.value['phone'],
      marbleshop: {
        name: this.registerForm.get('marbleshopDetails')?.value['marbleshopName'],
        email: this.registerForm.get('marbleshopDetails')?.value['marbleshopEmail'],
        phone: this.registerForm.get('marbleshopDetails')?.value['marbleshopPhone']
      }
    }
    this.authService.masterUserRegister(data).subscribe({
      next: () => this.router.navigate(['/login'], { relativeTo: this.route }),
      error: (err) => {
        console.log(err)
      },
    })
  }
}
