import { Component, inject, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../domain/Customer';
import { Quotation } from '../../domain/Quotation';
import { MarbleshopItem } from '../../domain/MarbleshopItem';
import { MiscellaneousItem } from '../../domain/MiscellaneousItem';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.sass',
})
export class QuotationFormComponent {
  isSaving = input(false);
  customers!: Customer[]
  quotationForm: FormGroup;
  authService = inject(AuthService)
  fb = inject(FormBuilder);
  customerService = inject(CustomerService)
  constructor() {
    this.quotationForm = this.fb.group({
      id: [''],
      name: [''],
      details: [''],
      address: [''],
      deadlineDays: [''],
      daysForDue: [''],
      totalValue: [''],
      totalArea: [''],
      quotationStatus: [''],
      customer: [],
      marbleshopUser: [],
      marbleshopItems: this.fb.array([]),
      miscellaneousItems: this.fb.array([]),
      createdAt: [],
    });
    this.loadCustomers()
  }

  closeQuotationForm() {
    throw new Error('Method not implemented.');
  }
  submitQuotationForm() {
    throw new Error('Method not implemented.');
  }

  loadCustomers() {
    this.customerService.getAllCustomersFromMarbleshop(this.authService.getMarbleshopId()).subscribe((data) => {
      this.customers = data
      console.log(data)
    })
  }

  private retrieveMarbleshopItems(quotation: Quotation) {
    const marbleshopItems = []
    if (quotation.marbleshopItems.length) {
      quotation.marbleshopItems.forEach(marbleshopItem => marbleshopItems.push(this.createMarbleshopItem(marbleshopItem)))
    } else {
      marbleshopItems.push(this.createMarbleshopItem())
    }
    return marbleshopItems
  }

  private retrieveMiscellaneousItems(quotation: Quotation) {
    const miscellaneousItems = []
    if (quotation.miscellaneousItems.length) {
      quotation.miscellaneousItems.forEach(miscellaneousItem => this.createMiscellaneousItem(miscellaneousItem))
    } else {
      miscellaneousItems.push(this.createMiscellaneousItem())
    }
    return miscellaneousItems
  }

  private createMarbleshopItem(marbleshopItem: MarbleshopItem = { id: '', name: '', description: '', measureX: 0, measureY: 0, quantity: 1, unitValue: 0, unitArea: 0, totalValue: 0, totalArea: 0, marbleshopMaterial: { id: '', name: '', details: '', price: 0, lastPrice: 0, materialType: '' }, marbleshopSubItems: [{ id: '', name: '', measureX: 0, measureY: 0, description: '', quantity: 1, value: 0, area: 0, totalValue: 0, totalArea: 0, marbleshopSubItemType: '' }] }) {
    return this.fb.group({
      id: [marbleshopItem.id],
      name: [marbleshopItem.name, Validators.required],
      description: [marbleshopItem.description],
      measureX: [marbleshopItem.measureX],
      measureY: [marbleshopItem.measureY],
      quantity: [marbleshopItem.quantity],
      unitValue: [marbleshopItem.unitValue],
      unitArea: [marbleshopItem.unitArea],
      totalValue: [marbleshopItem.totalValue],
      totalArea: [marbleshopItem.totalArea],
      marbleshopMaterial: [marbleshopItem.marbleshopMaterial],
      marbleshopSubItems: [marbleshopItem.marbleshopSubItems]
    })
  }

  private createMiscellaneousItem(miscellaneousItem: MiscellaneousItem = { id: '', name: '', details: '', quantity: 1, unitValue: 0, totalValue: 0, miscellaneousMaterial: { id: '', name: '', details: '', price: 0, lastPrice: 0, miscellaneousMaterialType: '' } }) {
    return this.fb.group({
      id: [miscellaneousItem.id],
      name: [miscellaneousItem.name],
      details: [miscellaneousItem.details],
      quantity: [miscellaneousItem.quantity],
      unitValue: [miscellaneousItem.unitValue],
      totalValue: [miscellaneousItem.totalValue],
      miscellaneousMaterial: [miscellaneousItem.miscellaneousMaterial]
    })
  }

  getMarbleshopItemsFormArray() {
    return (<UntypedFormArray>this.quotationForm.get('marbleshopItems')).controls
  }

  getMiscellaneousItemsFormArray() {
    return (<UntypedFormArray>this.quotationForm.get('miscellaneousItems')).controls
  }

  addNewMarbleshopItem() {
    const marbleshopItems = this.quotationForm.get('marbleshopItems') as UntypedFormArray
    marbleshopItems.push(this.createMarbleshopItem())
  }

  addNewMiscellaneousItem() {
    const miscellaneousItems = this.quotationForm.get('miscellaneousItems') as UntypedFormArray
    miscellaneousItems.push(this.createMiscellaneousItem())
  }

  removeMarbleshopItem(index: number) {
    const marbleshopItems = this.quotationForm.get('marbleshopItems') as UntypedFormArray
    marbleshopItems.removeAt(index)
  }

  removeMiscellaneousItem(index: number) {
    const miscellaneousItems = this.quotationForm.get('miscellaneousItems') as UntypedFormArray
    miscellaneousItems.removeAt(index)
  }


}
