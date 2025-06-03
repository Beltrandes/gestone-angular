import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Customer } from '../../domain/Customer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.sass',
})
export class CustomerFormComponent {
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customer']?.currentValue) {
      this.customerForm.patchValue({
        id: this.customer()?.id,
        name: this.customer()?.name,
        phone: this.customer()?.phone,
        email: this.customer()?.email,
        address: this.customer()?.address,
      });
      console.log(this.customerForm.value)
    }
  }

  closeCustomerForm() {
    this.close.emit();
  }

  submitCustomerForm() {
    this.submit.emit(this.customerForm.value);
  }


}
