import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { Quotation } from '../../domain/Quotation';
import { Order } from '../../domain/Order';
import { Payment } from '../../domain/Payment';
import { QuotationService } from '../../services/quotation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.sass'
})
export class OrderFormComponent {

  fb = inject(FormBuilder)

  isSaving = signal(false)

  quotationService = inject(QuotationService)

  authService = inject(AuthService)



  orderForm!: FormGroup

  close = output<boolean>()
  submit = output<Order>()
  quotations = signal<Quotation[] | null>(null)

  paymentTypes = [
    { name: 'Pix', value: 'PIX' },
    { name: 'Débito', value: 'DEBIT' },
    { name: 'Crédito', value: 'CREDIT' },
    { name: 'Dinheiro', value: 'CASH' },
    { name: 'Outros', value: 'OTHER' }

  ]


  constructor() {
    this.orderForm = this.fb.group({
      id: [],
      workAddress: [''],
      quotationId: [],
      discount: [0],
      payments: this.fb.array([]),
      notes: ['']
    })
    this.loadQuotations()
  }

  loadQuotations() {
    this.quotationService.getAllQuotationFromMarbleshop(this.authService.getMarbleshopId()).subscribe((data) => {
      this.quotations.set(data)
    })
  }


  closeOrderForm() {
    this.close.emit(true)
  }

  submitOrderForm() {
    this.submit.emit(this.orderForm.value)
  }

  private retrievePayments(order: Order | undefined): FormGroup[] {
    const payments: FormGroup[] = [];
    if (order?.payments?.length) {
      order.payments.forEach(payment => {
        const paymentForm = this.createPayment(payment);

        payments.push(paymentForm);
      });
    } else {
      payments.push(this.createPayment());
    }
    return payments;
  }


  private createPayment(payment: Payment = { id: '', details: '', payedValue: 0, paymentType: '', createdAt: new Date }) {
    return this.fb.group({
      id: payment.id,
      details: payment.details,
      payedValue: payment.payedValue,
      paymentType: payment.paymentType,
    })
  }

  addNewPayment() {
    const payments = this.orderForm.get('payments') as UntypedFormArray
    payments.push(this.createPayment())
  }

  getPaymentsFormArray() {
    return (<UntypedFormArray>this.orderForm.get('payments')).controls
  }

  removePayment(index: number) {
    const payments = this.orderForm.get('payments') as UntypedFormArray
    payments.removeAt(index)
  }
}
