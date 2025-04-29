import { Component, inject, NgModule, signal, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';
import { map, Observable } from 'rxjs';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { MarbleshopMaterialService } from '../../services/marbleshop-material.service';
import { MarbleshopMaterialListComponent } from "../../components/marbleshop-material-list/marbleshop-material-list.component";
import { AsyncPipe, NgClass } from '@angular/common';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MiscellaneousMaterialListComponent } from '../../components/miscellaneous-material-list/miscellaneous-material-list.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MarbleshopMaterialForm } from '../../components/marbleshop-material-form/marbleshop-material-form.component';
import { MiscellaneousMaterialFormComponent } from '../../components/miscellaneous-material-form/miscellaneous-material-form.component';
import { MiscellaneousMaterialService } from '../../services/miscellaneous-material.service';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [NavbarComponent, ControllerComponent, MarbleshopMaterialListComponent, AsyncPipe, MiscellaneousMaterialListComponent, MarbleshopMaterialForm, ModalComponent, NgClass, FormsModule, MiscellaneousMaterialFormComponent],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass'
})
export class MaterialComponent {
  marbleshopMaterials$!: Observable<MarbleshopMaterial[]>
  miscellaneousMaterials$!: Observable<MiscellaneousMaterial[]>
  isMarbleshopMaterialFormOpened = signal<boolean>(false);
  isMiscellaneousMaterialFormOpened = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  toastr = inject(ToastrService);
  materialType = signal<'marbleshop' | 'miscellaneous'>('marbleshop')
  marbleshopMaterialService = inject(MarbleshopMaterialService)
  miscellaneousMaterialService = inject(MiscellaneousMaterialService)
  editingMarbleshopMaterial!: MarbleshopMaterial;
  editingMiscellaneousMaterial!: MiscellaneousMaterial;
  modalType = signal<'materialType' | 'updatePrice' | 'delete'>('materialType')
  price: number | null = null
  materialId: string | null = null
  modalConfirmActionButtonColor = signal<string>('info')

  @ViewChild(ModalComponent) modal?: ModalComponent;

  constructor() {
    this.loadMarbleshopMaterials()
    this.loadMiscellaneousMaterials()
  }

  loadMarbleshopMaterials() {
    this.marbleshopMaterials$ = this.marbleshopMaterialService.getAllMarbleshopMaterials().pipe(map(materials => materials.slice().sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))))
  }

  loadMiscellaneousMaterials() {
    this.miscellaneousMaterials$ = this.miscellaneousMaterialService.getAllMiscellaneousMaterials()
  }

  openMarbleshopMaterialForm() {

    this.isMarbleshopMaterialFormOpened.set(true);
  }
  openMiscellaneousMaterialForm() {
    this.isMiscellaneousMaterialFormOpened.set(true);
  }
  closeMarbleshopMaterialForm() {
    this.isMarbleshopMaterialFormOpened.set(false);
  }
  closeMiscellaneousMaterialForm() {
    this.isMiscellaneousMaterialFormOpened.set(false);
  }

  confirmModal() {
    this.modal?.closeModal()
    if (this.modalType() === 'materialType' && this.materialType() === 'marbleshop') {
      this.openMarbleshopMaterialForm()
      this.closeMiscellaneousMaterialForm()
    }
    if (this.modalType() === 'materialType' && this.materialType() === 'miscellaneous') {
      this.openMiscellaneousMaterialForm()
      this.closeMarbleshopMaterialForm()
    }

    if (this.modalType() === 'updatePrice' && this.materialType() === 'marbleshop') {
      this.marbleshopMaterialService.updateMarbleshopMaterialPrice({ materialId: this.materialId!!, price: this.price!! }).subscribe({
        next: () => {
          this.loadMarbleshopMaterials()
        },
        error: (err) => console.log(err)
      })
    }
    if (this.modalType() === 'updatePrice' && this.materialType() === 'miscellaneous') {
      this.miscellaneousMaterialService.updateMiscellaneousMaterialPrice({ materialId: this.materialId!!, price: this.price!! }).subscribe({
        next: () => {
          this.loadMiscellaneousMaterials()
        },
        error: (err) => console.log(err)
      })
    }
    if (this.modalType() === 'delete' && this.materialType() === 'marbleshop') {
      this.marbleshopMaterialService.deleteMarbleshopMaterial(this.materialId!!).subscribe({
        next: () => {
          this.loadMarbleshopMaterials()
        },
        error: (err) => console.log(err)
      })
    }
    if (this.modalType() === 'delete' && this.materialType() === 'miscellaneous') {
      this.miscellaneousMaterialService.deleteMiscellaneousMaterial(this.materialId!!).subscribe({
        next: () => {
          this.loadMiscellaneousMaterials()
        },
        error: (err) => console.log(err)
      })
    }
  }
  saveMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial) {
    this.marbleshopMaterialService.saveMarbleshopMaterial(marbleshopMaterial).subscribe({
      next: () => {
        this.isSaving.set(true);
      },
      error: (err) => console.log(err),
      complete: () => {
        setTimeout(() => {
          this.closeMarbleshopMaterialForm();
          this.toastr.success(
            'Material registado com sucesso!',
            'Mensagem do sistema'
          );
          this.isSaving.set(false);
          this.editingMarbleshopMaterial = {} as MarbleshopMaterial
          this.loadMarbleshopMaterials();
        }, 2000);
      }
    })
  }
  saveMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial) {
    this.miscellaneousMaterialService.saveMiscellaneousMaterial(miscellaneousMaterial).subscribe({
      next: () => {
        this.isSaving.set(true);
      },
      error: (err) => console.log(err),
      complete: () => {
        setTimeout(() => {
          this.closeMiscellaneousMaterialForm();
          this.toastr.success(
            'Material diverso registado com sucesso!',
            'Mensagem do sistema'
          );
          this.isSaving.set(false);
          this.loadMiscellaneousMaterials();
        }, 2000);
      }
    })
  }


  openModal(modalType: string, materialId?: string, materialPrice?: number, materialType?: string) {
    if (modalType === 'materialType') {
      this.modalType.set(modalType)
      this.modalConfirmActionButtonColor.set('info')
      this.materialId = null
      this.modal?.openModal('Selecione uma opção');
    }
    if (modalType === 'updatePrice' && this.materialType() === 'marbleshop') {
      this.modalType.set(modalType)
      this.materialType.set('marbleshop')
      this.price = materialPrice!!
      this.materialId = materialId!!
      this.modalConfirmActionButtonColor.set('info')
      this.modal?.openModal('Preencha o campo')
    }
    if (modalType === 'updatePrice' && this.materialType() === 'miscellaneous') {
      this.materialType.set('miscellaneous')
      this.price = materialPrice!!
      this.materialId = materialId!!
      this.modalConfirmActionButtonColor.set('info')

      this.modal?.openModal('Preencha o campo')
    }
    this.selectType(materialType!!)
    if (modalType === 'delete' && this.materialType() === 'marbleshop') {
      this.modalType.set(modalType)
      this.materialId = this.editingMarbleshopMaterial.id!!
      this.modalConfirmActionButtonColor.set('danger')
      this.modal?.openModal('Deseja realmente excluir?')
    }
    if (modalType === 'delete' && this.materialType() === 'miscellaneous') {
      this.modalType.set(modalType)
      this.materialId = this.editingMiscellaneousMaterial.id
      this.modalConfirmActionButtonColor.set('danger')
      this.modal?.openModal('Deseja realmente excluir?')
    }
  }



  selectType(type: string) {
    if (type === 'marbleshop') this.materialType.set('marbleshop')
    if (type === 'miscellaneous') this.materialType.set('miscellaneous')
  }

  editMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial) {
    this.materialType.set('marbleshop')
    this.editingMarbleshopMaterial = marbleshopMaterial
    this.openMarbleshopMaterialForm()
  }
  editMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial) {
    this.materialType.set('miscellaneous')
    this.editingMiscellaneousMaterial = miscellaneousMaterial
    this.openMiscellaneousMaterialForm()
  }

  openDeleteMarbleshopMaterialModal(marbleshopMaterial: MarbleshopMaterial) {
    this.materialType.set('marbleshop')
    this.modalType.set('delete')
    this.editingMarbleshopMaterial = marbleshopMaterial
    this.openModal('delete')
  }
}
