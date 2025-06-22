import { MaterialTypeDialogComponent } from './../../components/material-type-dialog/material-type-dialog.component';
import { Component, inject, signal } from '@angular/core';
import { ControllerComponent } from '../../components/controller/controller.component';
import { map, Observable } from 'rxjs';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { MarbleshopMaterialService } from '../../services/marbleshop-material.service';
import { MarbleshopMaterialListComponent } from "../../components/marbleshop-material-list/marbleshop-material-list.component";
import { AsyncPipe } from '@angular/common';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { MiscellaneousMaterialListComponent } from '../../components/miscellaneous-material-list/miscellaneous-material-list.component';
import { FormsModule } from '@angular/forms';
import { MarbleshopMaterialForm } from '../../components/marbleshop-material-form/marbleshop-material-form.component';
import { MiscellaneousMaterialFormComponent } from '../../components/miscellaneous-material-form/miscellaneous-material-form.component';
import { MiscellaneousMaterialService } from '../../services/miscellaneous-material.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MaterialPriceChangeDialogComponent } from '../../components/material-price-change-dialog/material-price-change-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material',
  imports: [ControllerComponent, MarbleshopMaterialListComponent, AsyncPipe, MiscellaneousMaterialListComponent, MarbleshopMaterialForm, FormsModule, MiscellaneousMaterialFormComponent, MatIconModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass'
})
export class MaterialComponent {
  marbleshopMaterials$!: Observable<MarbleshopMaterial[]>
  miscellaneousMaterials$!: Observable<MiscellaneousMaterial[]>
  isMarbleshopMaterialFormOpened = signal<boolean>(false);
  isMiscellaneousMaterialFormOpened = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  materialType = signal<'marbleshop' | 'miscellaneous'>('marbleshop')
  marbleshopMaterialService = inject(MarbleshopMaterialService)
  miscellaneousMaterialService = inject(MiscellaneousMaterialService)
  editingMarbleshopMaterial!: MarbleshopMaterial;
  editingMiscellaneousMaterial!: MiscellaneousMaterial;
  modalType = signal<'materialType' | 'updatePrice' | 'delete'>('materialType')
  price: number | null = null
  materialId: string | null = null
  modalConfirmActionButtonColor = signal<string>('info')
  private readonly _snackBar = inject(MatSnackBar)

  readonly modal = inject(MatDialog)

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

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  confirmModal() {
    if (this.modalType() === 'materialType' && this.materialType() === 'marbleshop') {
      this.openMarbleshopMaterialForm()
      this.closeMiscellaneousMaterialForm()
    }
    if (this.modalType() === 'materialType' && this.materialType() === 'miscellaneous') {
      this.openMiscellaneousMaterialForm()
      this.closeMarbleshopMaterialForm()
    }

    if (this.modalType() === 'updatePrice' && this.materialType() === 'marbleshop') {
      this.marbleshopMaterialService.updateMarbleshopMaterialPrice({ materialId: this.materialId!, price: this.price! }).subscribe({
        next: () => {
          this.loadMarbleshopMaterials()
        },
        error: (err) => console.log(err)
      })
    }
    if (this.modalType() === 'updatePrice' && this.materialType() === 'miscellaneous') {
      this.miscellaneousMaterialService.updateMiscellaneousMaterialPrice({ materialId: this.materialId!, price: this.price! }).subscribe({
        next: () => {
          this.loadMiscellaneousMaterials()
        },
        error: (err) => console.log(err)
      })
    }
    if (this.modalType() === 'delete' && this.materialType() === 'marbleshop') {
      this.marbleshopMaterialService.deleteMarbleshopMaterial(this.materialId!).subscribe({
        next: () => {
          this.loadMarbleshopMaterials()
        },
        error: (err) => console.log(err)
      })
    }
    if (this.modalType() === 'delete' && this.materialType() === 'miscellaneous') {
      this.miscellaneousMaterialService.deleteMiscellaneousMaterial(this.materialId!).subscribe({
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
      error: (err) => {
        this.openSnackBar('Ocorreu um erro, material não registrado!', 'Fechar');
      },
      complete: () => {
        setTimeout(() => {
          this.closeMarbleshopMaterialForm();
          this.openSnackBar('Material registado com sucesso!', 'Fechar');
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
      error: (err) => {
        this.openSnackBar('Ocorreu um erro, material diverso não registrado!', 'Fechar');
      },
      complete: () => {
        setTimeout(() => {
          this.closeMiscellaneousMaterialForm();
          this.openSnackBar('Material diverso registado com sucesso!', 'Fechar');
          this.isSaving.set(false);
          this.loadMiscellaneousMaterials();
        }, 2000);
      }
    })
  }


  openModal(modalType: string, materialId?: string, materialPrice?: number, materialType?: string) {
    this.selectType(materialType!)
    if (modalType === 'materialType') {
      this.modalType.set(modalType)
      const materialTypeDialogRef = this.modal.open(MaterialTypeDialogComponent, {
        data: {
          title: 'Selecione o tipo de material',
        }
      })
      materialTypeDialogRef.afterClosed().subscribe(result => {
        if (result === 'marbleshop') {
          this.openMarbleshopMaterialForm()
        }
        if (result === 'miscellaneous') {
          this.openMiscellaneousMaterialForm()
        }
      });


    };

    if (modalType === 'updatePrice' && this.materialType() === 'marbleshop') {
      this.modalType.set(modalType)
      this.materialType.set('marbleshop')
      this.materialId = materialId!
      const materialPriceChangeDialogRef = this.modal.open(MaterialPriceChangeDialogComponent, {
        data: {
          title: 'Qual o novo preço do material?',
          price: materialPrice,
        }
      })
      materialPriceChangeDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.price = result;
          this.marbleshopMaterialService.updateMarbleshopMaterialPrice({ materialId: this.materialId!, price: this.price! }).subscribe({
            next: () => {
              this.loadMarbleshopMaterials()
            },
            error: (err) => console.log(err)
          })
        }

      });
    }
    if (modalType === 'updatePrice' && this.materialType() === 'miscellaneous') {
      this.modalType.set(modalType)
      this.materialType.set('miscellaneous')
      this.materialId = materialId!
      const materialPriceChangeDialogRef = this.modal.open(MaterialPriceChangeDialogComponent, {
        data: {
          title: 'Qual o novo preço do material diverso?',
          price: materialPrice,
        }
      })
      materialPriceChangeDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.price = result;
          this.miscellaneousMaterialService.updateMiscellaneousMaterialPrice({ materialId: this.materialId!, price: this.price! }).subscribe({
            next: () => {
              this.loadMiscellaneousMaterials()
            },
            error: (err) => console.log(err)
          })
        }

      });
    }
    if (modalType === 'delete' && this.materialType() === 'marbleshop') {
      this.modalType.set(modalType)
      this.materialId = this.editingMarbleshopMaterial.id!
      this.modalConfirmActionButtonColor.set('danger')
    }
    if (modalType === 'delete' && this.materialType() === 'miscellaneous') {
      this.modalType.set(modalType)
      this.materialId = this.editingMiscellaneousMaterial.id
      this.modalConfirmActionButtonColor.set('danger')
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
