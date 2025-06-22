import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../domain/Customer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
    selector: 'app-customer-form',
    imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule],
    templateUrl: './customer-form.component.html',
    styleUrl: './customer-form.component.sass'
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customer = input<Customer>();
  fb = inject(FormBuilder);
  isSaving = input<boolean>();
  close = output();
  submit = output<Customer>();

  constructor() {
    this.customerForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      address: [''],
    });
  }

  ngOnInit() {
    if (this.customer()?.id) {
      this.customerForm.patchValue({
        id: this.customer()?.id,
        name: this.customer()?.name,
        phone: this.customer()?.phone,
        email: this.customer()?.email,
        address: this.customer()?.address,
      });
    }
  }

  closeCustomerForm() {
    this.close.emit();
    this.customerForm.reset();
  }

  submitCustomerForm() {
    this.submit.emit(this.customerForm.value);
  }


}
