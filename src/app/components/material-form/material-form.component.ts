import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MarbleshopMaterialType } from '../../domain/MarbleshopMaterialType';
import { MiscellaneousMaterialType } from '../../domain/MiscellaneousMaterialType';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.sass'
})
export class MaterialFormComponent implements OnInit {
  materialForm!: FormGroup
  material = input<MarbleshopMaterial | MiscellaneousMaterial>();
  fb = inject(FormBuilder);
  isSaving = input<boolean>();
  close = output();
  submit = output<MarbleshopMaterial | MiscellaneousMaterial>();
  formType = input<'marbleshop' | 'miscellaneous'>('marbleshop')
  types: any[] = [];



  ngOnInit() {
    if (this.formType() === 'marbleshop') {
      this.types = [
        { value: MarbleshopMaterialType.GRANITE, label: 'Granito' },
        { value: MarbleshopMaterialType.MARBLE, label: 'Mármore' },
        { value: MarbleshopMaterialType.QUARTZ, label: 'Quartzo' },
        { value: MarbleshopMaterialType.SHEET, label: 'Lâmina' }
      ]
    }
    if (this.formType() === 'miscellaneous') {
      this.types = [
        { value: MiscellaneousMaterialType.SINK_BOWL, label: 'Cuba Inox' },
        { value: MiscellaneousMaterialType.VANITY_BOWL, label: 'Cuba de Louça' },
        { value: MiscellaneousMaterialType.TANK_VAT, label: 'Tanque Inox' },
        { value: MiscellaneousMaterialType.HOLDER, label: 'Suporte' },
        { value: MiscellaneousMaterialType.SUPPLIES, label: 'Insumos' }
      ]
    }
    this.initForm()
  }

  initForm() {
    const typeControlName = this.formType() === 'marbleshop' ? 'marbleshopMaterialType' : 'miscellaneousMaterialType'
    this.materialForm = this.fb.group({
      id: [],
      name: [''],
      details: [''],
      price: [],
      [typeControlName]: []
    })
  }
  get materialTypeControlName(): string {
    return this.formType() === 'marbleshop'
      ? 'marbleshopMaterialType'
      : 'miscellaneousMaterialType';
  }
  closeMaterialForm() {

  }

  submitMaterialForm() {
    this.submit.emit(this.materialForm.value)
  }
}
