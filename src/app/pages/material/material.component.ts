import { Component, inject, signal, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';
import { Observable } from 'rxjs';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { MaterialService } from '../../services/material.service';
import { MarbleshopMaterialListComponent } from "../../components/marbleshop-material-list/marbleshop-material-list.component";
import { AsyncPipe, NgClass } from '@angular/common';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MiscellaneousMaterialListComponent } from '../../components/miscellaneous-material-list/miscellaneous-material-list.component';
import { MaterialFormComponent } from '../../components/material-form/material-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [NavbarComponent, ControllerComponent, MarbleshopMaterialListComponent, AsyncPipe, MiscellaneousMaterialListComponent, MaterialFormComponent, ModalComponent, NgClass],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass'
})
export class MaterialComponent {
  marbleshopMaterials$!: Observable<MarbleshopMaterial[]>
  miscellaneousMaterials$!: Observable<MiscellaneousMaterial[]>
  isMaterialFormOpened = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  toastr = inject(ToastrService);
  materialType = signal<'marbleshop' | 'miscellaneous'>('marbleshop')
  materialService = inject(MaterialService)
  editingMaterial!: MarbleshopMaterial | MiscellaneousMaterial;
  modalType = signal<'materialType' | 'updatePrice'>('materialType')
  @ViewChild(ModalComponent) modal?: ModalComponent;

  constructor() {
    this.loadMarbleshopMaterials()
    this.loadMiscellaneousMaterials()
  }

  loadMarbleshopMaterials() {
    this.marbleshopMaterials$ = this.materialService.getAllMarbleshopMaterials()
  }

  loadMiscellaneousMaterials() {
    this.miscellaneousMaterials$ = this.materialService.getAllMiscellaneousMaterials()
  }

  openAddMaterialForm() {
    this.isMaterialFormOpened.set(true);
  }
  closeAddMaterialForm() {
    this.isMaterialFormOpened.set(false);
  }

  confirmModal() {
    this.modal?.closeModal()
    if (this.modalType() === 'materialType') {
      this.openAddMaterialForm()

    }
  }
  saveMaterial(material: MarbleshopMaterial | MiscellaneousMaterial) {
    if (this.materialType() === 'marbleshop') {
      this.materialService.saveMarbleshopMaterial(material as MarbleshopMaterial).subscribe({
        next: () => {
          this.isSaving.set(true);
        },
        error: (err) => console.log(err),
        complete: () => {
          setTimeout(() => {
            this.closeAddMaterialForm();
            this.toastr.success(
              'Material registado com sucesso!',
              'Mensagem do sistema'
            );
            this.isSaving.set(false);
            this.loadMarbleshopMaterials();
          }, 2000);
        }
      })
    }
    if (this.materialType() === 'miscellaneous') {
      this.materialService.saveMiscellaneousMaterial(material as MiscellaneousMaterial).subscribe({
        next: () => {
          this.isSaving.set(true);
        },
        error: (err) => console.log(err),
        complete: () => {
          setTimeout(() => {
            this.closeAddMaterialForm();
            this.toastr.success(
              'Material registado com sucesso!',
              'Mensagem do sistema'
            );
            this.isSaving.set(false);
            this.loadMiscellaneousMaterials();
          }, 2000);
        }
      })
    }
  }

  openModal(modalType: string) {
    if(modalType === 'materialType') {
      this.modalType.set(modalType)
      this.modal?.openModal('Selecione uma opção');
    }
    if (modalType === 'updatePrice') {
      this.modalType.set(modalType)
      this.modal?.openModal('Preencha o campo')
    }
  }



  selectType(type: string) {
    if (type === 'marbleshop') this.materialType.set('marbleshop')
    if (type === 'miscellaneous') this.materialType.set('miscellaneous')
  }
}
