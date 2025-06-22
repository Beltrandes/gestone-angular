import { AfterViewInit, Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MarbleshopMaterialType } from '../../domain/MarbleshopMaterialType';
import { MiscellaneousMaterialType } from '../../domain/MiscellaneousMaterialType';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-marbleshop-material-form',
    imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatProgressSpinner],
    templateUrl: './marbleshop-material-form.component.html',
    styleUrls: ['./marbleshop-material-form.sass'],
})
export class MarbleshopMaterialForm implements OnInit {
  marbleshopMaterialForm!: FormGroup
  marbleshopMaterial = input<MarbleshopMaterial>();
  fb = inject(FormBuilder);
  isSaving = input<boolean>();
  close = output<boolean>();
  submit = output<MarbleshopMaterial>();
  types = [
    { value: MarbleshopMaterialType.GRANITE, label: 'Granito' },
    { value: MarbleshopMaterialType.MARBLE, label: 'Mármore' },
    { value: MarbleshopMaterialType.QUARTZ, label: 'Quartzo' },
    { value: MarbleshopMaterialType.SHEET, label: 'Lâmina' }
  ]

  constructor() {
    this.marbleshopMaterialForm = this.fb.group({
      id: [],
      name: [''],
      details: [''],
      price: [],
      marbleshopMaterialType: []
    })
  }

  ngOnInit(): void {
    if (this.marbleshopMaterial()?.id) {
      this.marbleshopMaterialForm.patchValue({
        id: this.marbleshopMaterial()?.id,
        name: this.marbleshopMaterial()?.name,
        details: this.marbleshopMaterial()?.details,
        price: this.marbleshopMaterial()?.price,
        marbleshopMaterialType: this.marbleshopMaterial()?.materialType
      })
    }
  }



  closeMarbleshopMaterialForm() {
    this.close.emit(true)
    this.marbleshopMaterialForm.reset()
  }

  submitMaterialForm() {
    this.submit.emit(this.marbleshopMaterialForm.value)
  }
}
