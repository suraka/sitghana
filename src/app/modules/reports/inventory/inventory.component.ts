import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { routerTransition } from './../../../router.animations';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NzModalRef, NzNotificationService, NzModalService } from 'ng-zorro-antd';

import { InventoryService } from './../../../core/services';
import { Inventory, RawMaterial } from '../../../core/models';

const now = new Date();

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [routerTransition()]
})
export class InventoryComponent implements OnInit {

  public rawMaterials: any;
  public workInProgress: any;
  public finishedGoods: any;
  public suppliers: any;
  private uid: string;
  private bid: string;

  /* Add New Inventory Modal Properties */
  inventoryModal: NzModalRef;
  inventoryModalButtonLoading = false;
  addNewInventoryForm: FormGroup;
  /* End */

  /* Audit Inventory Modal Properties */
  auditInventoryModal: NzModalRef;
  auditInventoryModalButtonLoading = false;
  auditInventoryForm: FormGroup;
  /* End */

  /* Damage Inventory Modal Properties */
  damageInventoryModal: NzModalRef;
  damageInventoryModalButtonLoading = false;
  damageInventoryForm: FormGroup;
  /* End */

  /* Inventory Table Properties */
  public pageIndex = 1;
  public pageSize = 10;
  public total = 1;
  public dataSet = [];
  public loading = true;
  public sortValue = null;
  public sortKey = null;
  filterSupplier = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  searchTypeList: string[] = [];
  /* End */

  /* From - To Date Properties */
  public fromDate: NgbDateStruct;
  public toDate: NgbDateStruct;
  /* End */

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NzNotificationService,
    private inventoryService: InventoryService
  ) {
    this.route.queryParams.subscribe(
      (params) => {
        // Defaults to 0 if no query param provided.
        this.uid = decodeURI(params['id']);
        this.bid = decodeURI(params['bid']);
      });

    /* Add New Inventory Form Valiation Rules */
    this.addNewInventoryForm = this.fb.group({
      rawMaterial: ['', [Validators.required]],
      finishedGood: ['', [Validators.required]],
      wip: ['', [Validators.required]],
      inventory: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

    /* Audit Inventory Form Valiation Rules */
    this.auditInventoryForm = this.fb.group({
      rawMaterial: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });

    /* Damage Inventory Form Valiation Rules */
    this.damageInventoryForm = this.fb.group({
      rawMaterial: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  ngOnInit() {

    /* this.inventoryService.getSuppliers({ 'uid': this.uid, 'bid': this.bid }).subscribe(
      (suppliers) => {
        this.suppliers = suppliers;
        console.log(this.suppliers);
      }
    ); */

    /* Get Raw Materials Data */
    this.inventoryService.getRawMaterials().subscribe(
      (response) => {
        this.rawMaterials = response;
      }
    );

    /* Get Finished Goods Data */
    this.inventoryService.getFinishedGoods().subscribe(
      (response) => {
        this.finishedGoods = response;
      }
    );

    /* Get Work in Progress Data */
    this.inventoryService.getWorkInProgresses().subscribe(
      (response) => {
        this.workInProgress = response;
      }
    );

    /* Get Suppliers Data */
    this.inventoryService.getSuppliers(this.uid, this.bid).subscribe((response) => {
      this.suppliers = response;
    });

    /* Get Filtered Data on Page Initialization */
    this.searchData();

    /* Date Settings Parameters */
    this.toDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.fromDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1 - (this.toDate.month.valueOf() - 1),
      day: now.getDate() - (this.toDate.day.valueOf() - 1)
    };
    /* End */
  }

  /* Table Methods for Getting, Sorting and Filtering Data for display */
  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.inventoryService.getInventories(
      this.pageIndex,
      this.pageSize,
      this.sortKey,
      this.sortValue,
      this.searchTypeList
    ).subscribe((data) => {
      this.loading = false;
      this.total = 200;
      this.dataSet = data;
    });
  }

  updateFilter(value: string[]): void {
    this.searchTypeList = value;
    this.searchData(true);
  }
  /* End */

  /* Add New Inventory Modal */
  createInventoryModal(
    inventoryModalTitle: TemplateRef<{}>,
    inventoryModalContent: TemplateRef<{}>,
    inventoryModalFooter: TemplateRef<{}>
  ): void {
    this.inventoryModal = this.modalService.create({
      nzTitle: inventoryModalTitle,
      nzContent: inventoryModalContent,
      nzFooter: inventoryModalFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  closeInventoryModal(): void {
    this.inventoryModal.destroy();
  }

  processingNewInventory(): void {
    this.inventoryModalButtonLoading = true;
    window.setTimeout(() => {
      this.addNewInventory(this.addNewInventoryForm.value);
      this.inventoryModalButtonLoading = false;
      this.inventoryModal.destroy();
    }, 1000);
  }

  addNewInventory(inventory) {
    const material = inventory.rawMaterial.split('-', 4);
    const data = {
      'uid': this.bid,
      'bid': this.uid,
      'rawMaterial': {
        'id': material[0],
        'name': material[1],
      },
      'supplier': {
        'id': material[2],
        'name': material[3]
      },
      'quantity': inventory.quantity,
      'price': inventory.price,
      'created': new Date().getTime(),
      'updated': new Date().getTime(),
    };

    try {
      this.inventoryService.addInventory(data);
      this.alertNotification('success', 'Add Inventory', `${data.rawMaterial.name} has been recorded into the database. Thank you`);
    } catch (error) {
      this.alertNotification('error', 'Error found', error);
    }
    this.addNewInventoryForm.reset();
  }

  resetNewInventoryForm(e: MouseEvent): void {
    e.preventDefault();
    this.addNewInventoryForm.reset();
  }
  /* End Inventory Form */

  /* Audit Inventory */
  createAuditInventoryModal(
    auditInventoryModalTitle: TemplateRef<{}>,
    auditInventoryModalContent: TemplateRef<{}>,
    auditInventoryModalFooter: TemplateRef<{}>
  ): void {
    this.auditInventoryModal = this.modalService.create({
      nzTitle: auditInventoryModalTitle,
      nzContent: auditInventoryModalContent,
      nzFooter: auditInventoryModalFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  closeAuditInventoryModal(): void {
    this.auditInventoryModal.destroy();
  }

  processingAuditInventory(): void {
    this.auditInventoryModalButtonLoading = true;
    window.setTimeout(() => {
      this.auditInventory(this.auditInventoryForm.value);
      this.auditInventoryModalButtonLoading = false;
      this.auditInventoryModal.destroy();
    }, 1000);
  }

  auditInventory(inventory) {
    const material = inventory.rawMaterial.split('-', 4);
    const data = {
      'uid': this.bid,
      'bid': this.uid,
      'rawMaterial': {
        'id': material[0],
        'name': material[1],
      },
      'supplier': {
        'id': material[2],
        'name': material[3]
      },
      'quantity': inventory.quantity,
      'created': new Date().getTime(),
      'updated': new Date().getTime(),
    };

    try {
      this.inventoryService.auditInventory(data);
      this.alertNotification('success', 'Audit Inventory', `${data.rawMaterial.name} has been audited into the database. Thank you`);
    } catch (error) {
      this.alertNotification('error', 'Error found', error);
    }
    this.auditInventoryForm.reset();
  }

  resetAuditInventoryForm(e: MouseEvent): void {
    e.preventDefault();
    this.auditInventoryForm.reset();
  }
  /* End Audit Inventory Form */

  /* Damage Inventory */
  createDamageInventoryModal(
    damageInventoryModalTitle: TemplateRef<{}>,
    damageInventoryModalContent: TemplateRef<{}>,
    damageInventoryModalFooter: TemplateRef<{}>
  ): void {
    this.damageInventoryModal = this.modalService.create({
      nzTitle: damageInventoryModalTitle,
      nzContent: damageInventoryModalContent,
      nzFooter: damageInventoryModalFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  closeDamageInventoryModal(): void {
    this.damageInventoryModal.destroy();
  }

  processingDamageInventory(): void {
    this.damageInventoryModalButtonLoading = true;
    window.setTimeout(() => {
      this.damageInventory(this.damageInventoryForm.value);
      this.damageInventoryModalButtonLoading = false;
      this.damageInventoryModal.destroy();
    }, 1000);
  }

  damageInventory(inventory) {
    const material = inventory.rawMaterial.split('-', 4);
    const data = {
      'uid': this.bid,
      'bid': this.uid,
      'rawMaterial': {
        'id': material[0],
        'name': material[1],
      },
      'supplier': {
        'id': material[2],
        'name': material[3]
      },
      'quantity': inventory.quantity,
      'created': new Date().getTime(),
      'updated': new Date().getTime(),
    };

    try {
      this.inventoryService.damageInventory(data);
      this.alertNotification('success', 'Damage Inventory', `${data.rawMaterial.name} has been reported accordingly. Thank you`);
    } catch (error) {
      this.alertNotification('error', 'Error found', error);
    }
    this.damageInventoryForm.reset();
  }

  resetDamageInventoryForm(e: MouseEvent): void {
    e.preventDefault();
    this.damageInventoryForm.reset();
  }
  /* End Damage Inventory Form */

  /* Alert Messages */
  alertNotification(type: string, title: string, content: string, options?: any): void {
    this.notify.config({
      nzTop: '60px'
    });
    this.notify.create(type, title, content);
  }
}
