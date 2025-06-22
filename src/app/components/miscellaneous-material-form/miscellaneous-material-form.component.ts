import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MiscellaneousMaterialType } from '../../domain/MiscellaneousMaterialType';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-miscellaneous-material-form',
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinner, MatIconModule],
  templateUrl: './miscellaneous-material-form.component.html',
  styleUrls: ['./miscellaneous-material-form.component.sass'],
})
export class MiscellaneousMaterialFormComponent {
  miscellaneousMaterialForm!: FormGroup
  miscellaneousMaterial = input<MiscellaneousMaterial>();
  fb = inject(FormBuilder);
  isSaving = input<boolean>();
  close = output<boolean>();
  submit = output<MiscellaneousMaterial>();
  types = [
    { value: MiscellaneousMaterialType.SINK_BOWL, label: 'Cuba' },
    { value: MiscellaneousMaterialType.VANITY_BOWL, label: 'Cuba de Louça' },
    { value: MiscellaneousMaterialType.TANK_VAT, label: 'Tanque' },
    { value: MiscellaneousMaterialType.HOLDER, label: 'Suporte' },
    { value: MiscellaneousMaterialType.SUPPLIES, label: 'Insumo' },
  ]

  constructor() {
    this.miscellaneousMaterialForm = this.fb.group({
      id: [],
      name: [''],
      details: [''],
      price: [],
      miscellaneousMaterialType: []
    })
  }

  ngOnInit(): void {
    if (this.miscellaneousMaterial()?.id) {
      this.miscellaneousMaterialForm.patchValue({
        id: this.miscellaneousMaterial()?.id,
        name: this.miscellaneousMaterial()?.name,
        details: this.miscellaneousMaterial()?.details,
        price: this.miscellaneousMaterial()?.price,
        miscellaneousMaterialType: this.miscellaneousMaterial()?.miscellaneousMaterialType
      })
    }
  }

  closeMiscellaneousMaterialForm() {
    this.close.emit(true)
  }

  submitMaterialForm() {
    this.submit.emit(this.miscellaneousMaterialForm.value)
  }
}

