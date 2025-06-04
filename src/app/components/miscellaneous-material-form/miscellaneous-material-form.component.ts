import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MiscellaneousMaterialType } from '../../domain/MiscellaneousMaterialType';

@Component({
    selector: 'app-miscellaneous-material-form',
    imports: [ReactiveFormsModule],
    templateUrl: './miscellaneous-material-form.component.html'
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

