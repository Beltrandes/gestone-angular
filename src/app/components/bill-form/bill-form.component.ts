import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, inject, input, output, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Bill } from '../../domain/Bill';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-bill-form',
  imports: [ReactiveFormsModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, A11yModule],
  templateUrl: './bill-form.component.html',
  styleUrl: './bill-form.component.sass'
})
export class BillFormComponent {
  billForm!: FormGroup
  close = output<boolean>()
  submit = output<Bill>()
  bill = input<Bill | null>();
  isSaving = input<boolean>(false);
  fb = inject(FormBuilder);
  @ViewChildren('paidValueInput') paidValueInput!: ElementRef

  billCategories = [
    { name: 'Matéria Prima', value: 'RAW_MATERIAL' },
    { name: 'Mão de Obra', value: 'WORK_FORCE' },
    { name: 'Ferramentas', value: 'TOOLS' },
    { name: 'Insumos', value: 'SUPPLIES' },
    { name: 'Equipamentos', value: 'EQUIPMENT' },
    { name: 'Equipamentos', value: 'EQUIPMENT' },
    { name: 'Despesa Fixa', value: 'FIXED_EXPENSE' },
    { name: 'Serviços Terceirizados', value: 'OUTSOURCED_SERVICES' },
    { name: 'Manutenção', value: 'MAINTENANCE' },
    { name: 'Impostos', value: 'TAXES' },
    { name: 'Outros', value: 'OTHER' }
  ]


  constructor() {
    this.billForm = this.fb.group({
      id: [''],
      description: [''],
      totalValue: [''],
      paidValue: [''],
      dueDate: [''],
      paymentDate: [''],
      category: [''],
      notes: [''],
      marbleshopId: ['']
    });
  }

  ngOnInit() {
    if (this.bill) {
      this.billForm.patchValue(this.bill);
    }
   }
  closeBillForm() {
    this.close.emit(true);
  }

  submitPaymentForm() {
    if (this.billForm.valid) {
      this.submit.emit(this.billForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
