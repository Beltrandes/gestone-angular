import { Component, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
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
import { MarbleshopMaterialService } from '../../services/marbleshop-material.service';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { MarbleshopSubItem } from '../../domain/MarbleshopSubItem';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MiscellaneousMaterialService } from '../../services/miscellaneous-material.service';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.sass',
})
export class QuotationFormComponent implements OnInit {
  isSaving = input(false);
  customers!: Customer[]
  marbleshopMaterials!: MarbleshopMaterial[]
  miscellaneousMaterials!: MiscellaneousMaterial[]
  quotationForm: FormGroup;
  authService = inject(AuthService)
  fb = inject(FormBuilder);
  submit = output<Quotation>();
  close = output();
  quotation = input<Quotation>();
  customerService = inject(CustomerService)
  marbleshopMaterialService = inject(MarbleshopMaterialService)
  miscellaneousMaterialService = inject(MiscellaneousMaterialService)
  marbleshopItemTypes = [
    { name: 'Bancada', value: 'WORKTOP' },
    { name: 'Ilha', value: 'ISLAND_TOP' },
    { name: 'Lavatório', value: 'VANITY_TOP' },
    { name: 'Soleira', value: 'GROUND_SILL' },
    { name: 'Peitoril', value: 'WALL_SILL' },
    { name: 'Aparador', value: 'SIDEBOARD' },
    { name: 'Outro', value: 'OTHER' }
  ]
  marbleshopSubItemTypes = [
    { name: 'Frontão', value: 'PEDIMENT' },
    { name: 'Saia', value: 'SKIRT' }
  ]

  miscellaneousItemTypes = [
    { name: 'Cuba', value: 'SINK_BOWL' },
    { name: 'Cuba Louça', value: 'VANITY_BOWL' },
    { name: 'Tanque', value: 'TANK_VAT' },
    { name: 'Apoiador', value: 'HOLDER' },
    { name: 'Suprimento', value: 'SUPPLIER' }
  ]
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
      customerId: [''],
      userEmail: [this.authService.getUserEmail()],
      marbleshopItems: this.fb.array([]),
      miscellaneousItems: this.fb.array([]),
      createdAt: [],
      paymentCondition: ['']
    });
    this.loadCustomers()
    this.loadMarbleshopMaterials()
    this.loadMiscellaneousMaterials()
  }

  ngOnInit() {
    if (this.quotation) {
      this.quotationForm.patchValue({
        id: this.quotation()?.id,
        name: this.quotation()?.name,
        details: this.quotation()?.details,
        address: this.quotation()?.address,
        deadlineDays: this.quotation()?.deadlineDays,
        daysForDue: this.quotation()?.daysForDue,
        totalValue: this.quotation()?.totalValue,
        totalArea: this.quotation()?.totalArea,
        quotationStatus: this.quotation()?.quotationStatus,
        customerId: this.quotation()?.customer.id,
        userEmail: this.authService.getUserEmail(),
        createdAt: this.quotation()?.createdAt,
        paymentCondition: this.quotation()?.paymentCondition,
      })
      this.quotationForm.setControl('marbleshopItems', this.fb.array(this.retrieveMarbleshopItems(this.quotation())))
      this.quotationForm.setControl('miscellaneousItems', this.fb.array(this.retrieveMiscellaneousItems(this.quotation())))

    }
  }



  closeQuotationForm() {
    this.close.emit()
  }
  submitQuotationForm() {
    this.submit.emit(this.quotationForm.value)
  }

  loadCustomers() {
    this.customerService.getAllCustomersFromMarbleshop(this.authService.getMarbleshopId()).subscribe((data) => {
      this.customers = data
    })
  }

  loadMarbleshopMaterials() {
    this.marbleshopMaterialService.getAllMarbleshopMaterials().subscribe((data) => {
      this.marbleshopMaterials = data
    })
  }

  loadMiscellaneousMaterials() {
    this.miscellaneousMaterialService.getAllMiscellaneousMaterials().subscribe((data) => {
      this.miscellaneousMaterials = data
    })
  }

  private retrieveMarbleshopItems(quotation: Quotation | undefined): FormGroup[] {
    const marbleshopItems: FormGroup[] = [];
    if (quotation?.marbleshopItems?.length) {
      quotation.marbleshopItems.forEach(marbleshopItem => {
        const itemForm = this.createMarbleshopItem(marbleshopItem);
        if (marbleshopItem.marbleshopSubItems.length > 0) {
          itemForm.setControl(
            'marbleshopSubItems',
            this.fb.array(this.retrieveMarbleshopSubItems(marbleshopItem))
          );
        }

        marbleshopItems.push(itemForm);
      });
    } else {
      marbleshopItems.push(this.createMarbleshopItem());
    }
    console.log(marbleshopItems.forEach(item => console.log(item.value)))
    return marbleshopItems;
  }



  private retrieveMarbleshopSubItems(marbleshopItem: MarbleshopItem | undefined): FormGroup[] {
    const marbleshopSubItems: FormGroup[] = [];
    if (marbleshopItem?.marbleshopSubItems?.length) {
      marbleshopItem.marbleshopSubItems.forEach(subItem => {
        marbleshopSubItems.push(this.createMarbleshopSubItem(subItem));
      });
    } else {
      marbleshopSubItems.push(this.createMarbleshopSubItem());
    }
    return marbleshopSubItems;
  }


  private retrieveMiscellaneousItems(quotation: Quotation | undefined): FormGroup[] {
    if (quotation?.miscellaneousItems.length) {
      return quotation.miscellaneousItems.map(miscellaneousItem => this.createMiscellaneousItem(miscellaneousItem));
    }
    return [];
  }


  private createMarbleshopItem(marbleshopItem: MarbleshopItem = { id: '', name: '', description: '', measureX: 0, measureY: 0, quantity: 1, unitValue: 0, unitArea: 0, totalValue: 0, totalArea: 0, marbleshopMaterial: { id: '', name: '', details: '', price: 0, lastPrice: 0, materialType: '' }, marbleshopItemType: '', marbleshopSubItems: [] }) {
    return this.fb.group({
      id: marbleshopItem.id,
      name: marbleshopItem.name,
      description: marbleshopItem.description,
      measureX: marbleshopItem.measureX,
      measureY: marbleshopItem.measureY,
      quantity: marbleshopItem.quantity,
      unitValue: marbleshopItem.unitValue,
      unitArea: marbleshopItem.unitArea,
      totalValue: marbleshopItem.totalValue,
      totalArea: marbleshopItem.totalArea,
      marbleshopItemType: marbleshopItem.marbleshopItemType,
      marbleshopMaterialId: marbleshopItem.marbleshopMaterial.id,
      marbleshopSubItems: this.fb.array(
        marbleshopItem.marbleshopSubItems.map(subItem => this.createMarbleshopSubItem(subItem))
      )
    })
  }

  private createMarbleshopSubItem(marbleshopSubItem: MarbleshopSubItem = { id: '', name: '', description: '', measureX: 0, measureY: 0, quantity: 1, value: 0, area: 0, totalValue: 0, totalArea: 0, marbleshopSubItemType: '' }) {
    return this.fb.group({
      id: marbleshopSubItem.id,
      name: marbleshopSubItem.name,
      description: marbleshopSubItem.description,
      measureX: marbleshopSubItem.measureX,
      measureY: marbleshopSubItem.measureY,
      quantity: marbleshopSubItem.quantity,
      value: marbleshopSubItem.value,
      area: marbleshopSubItem.area,
      totalValue: marbleshopSubItem.totalValue,
      totalArea: marbleshopSubItem.totalArea,
      marbleshopSubItemType: marbleshopSubItem.marbleshopSubItemType
    })
  }

  addNewMarbleshopSubItem(itemIndex: number) {
    const marbleshopItems = this.quotationForm.get('marbleshopItems') as FormArray;
    const marbleshopItem = marbleshopItems.at(itemIndex) as FormGroup;
    const subItems = marbleshopItem.get('marbleshopSubItems') as FormArray;
    subItems.push(this.createMarbleshopSubItem());
  }

  removeMarbleshopSubItem(itemIndex: number, subItemIndex: number) {
    const marbleshopItems = this.quotationForm.get('marbleshopItems') as FormArray;
    const marbleshopItem = marbleshopItems.at(itemIndex) as FormGroup;
    const subItems = marbleshopItem.get('marbleshopSubItems') as FormArray;

    subItems.removeAt(subItemIndex);
  }

  private createMiscellaneousItem(miscellaneousItem: MiscellaneousItem = { id: '', name: '', details: '', quantity: 1, unitValue: 0, totalValue: 0, miscellaneousMaterial: { id: '', name: '', details: '', price: 0, lastPrice: 0, miscellaneousMaterialType: '' }, miscellaneousItemType: '' }) {
    return this.fb.group({
      id: [miscellaneousItem.id],
      name: [miscellaneousItem.name],
      details: [miscellaneousItem.details],
      quantity: [miscellaneousItem.quantity],
      unitValue: [miscellaneousItem.unitValue],
      totalValue: [miscellaneousItem.totalValue],
      miscellaneousItemType: [miscellaneousItem.miscellaneousItemType],
      miscellaneousMaterialId: [miscellaneousItem.miscellaneousMaterial.id]
    })
  }

  getMarbleshopItemsFormArray() {
    return (<UntypedFormArray>this.quotationForm.get('marbleshopItems')).controls
  }

  getMiscellaneousItemsFormArray() {
    return (<UntypedFormArray>this.quotationForm.get('miscellaneousItems')).controls
  }

  getMarbleshopSubItemsFormArray(itemIndex: number) {
    const marbleshopItems = this.getMarbleshopItemsFormArray()
    const marbleshopItem = marbleshopItems.at(itemIndex);
    if (!marbleshopItem) {
      throw new Error('Marbleshop item not found');
    }
    return (<UntypedFormArray>marbleshopItem.get('marbleshopSubItems')).controls;
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
    console.log(index)
    marbleshopItems.removeAt(index)
  }

  removeMiscellaneousItem(index: number) {
    const miscellaneousItems = this.quotationForm.get('miscellaneousItems') as UntypedFormArray
    miscellaneousItems.removeAt(index)
  }


}
