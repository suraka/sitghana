import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { NzModalRef, NzNotificationService, NzModalService } from 'ng-zorro-antd';

import {
    AuthService,
    SubscriptionService,
    InventoryService,
    AssetService,
    CustomerService,
} from './../../core/services';

import { Subscription, Business, Supplier, Customer, RawMaterial, FixedAsset } from './../../core/models';

const now = new Date();

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    /* Update Business Modal Properties */
    businessModal: NzModalRef;
    businessModalButtonLoading = false;
    addNewBusinessForm: FormGroup;
    /* End */

    /* Add Supplier Modal Properties */
    supplierModal: NzModalRef;
    supplierModalButtonLoading = false;
    addNewSupplierForm: FormGroup;
    /* End */

    /* Add Supplier Modal Properties */
    customerModal: NzModalRef;
    customerModalButtonLoading = false;
    addNewCustomerForm: FormGroup;
    /* End */

    /* Add Raw Material Modal Properties */
    rawMaterialModal: NzModalRef;
    rawMaterialModalButtonLoading = false;
    addNewRawMaterialForm: FormGroup;
    /* End */

    /* Add Work In Progress Modal Properties */
    workInProgressModal: NzModalRef;
    workInProgressModalButtonLoading = false;
    addNewWorkInProgressForm: FormGroup;
    /* End */

    /* Add Finished Goods Modal Properties */
    finishedGoodsModal: NzModalRef;
    finishedGoodsModalButtonLoading = false;
    addNewFinishedGoodsForm: FormGroup;
    /* End */

    /* Add Fixed Asset Modal Properties */
    fixedAssetModal: NzModalRef;
    fixedAssetModalButtonLoading = false;
    addNewFixedAssetForm: FormGroup;
    /* End */

    /* Update Factory Expenditure Modal Properties */
    factoryExpenditureModal: NzModalRef;
    factoryExpenditureModalButtonLoading = false;
    addNewFactoryExpenditureForm: FormGroup;
    /* End */

    /* Sidebar Properties */
    isActive = false;
    showBusinessMenu = 'business'; // empty string will toggle when user click other link
    showReportsMenu = 'reports'; // empty string will toggle when user click other link
    pushRightClass = 'push-right';
    public bid: string; // Business ID
    public uid: string; // Login User ID
    public businesses: Business[]; // Business Information Property
    public suppliers: any;
    public businessName: string;
    public subscriptions: Subscription[];

    constructor(
        public subscriptionService: SubscriptionService,
        public router: Router,
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private notify: NzNotificationService,
        private inventoryService: InventoryService,
        private assetService: AssetService,
        private customerService: CustomerService,
        private fb: FormBuilder
    ) {
        /* Get URL Parameters */
        this.route.queryParams.subscribe(
            (params) => {
            // Defaults to 0 if no query param provided.
            this.bid = decodeURI(params['bid']);
            this.uid = decodeURI(params['id']);
        });

        /* Hide Sidebar for Smaller Window */
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        /* Get Business Data from Firebase */
        this.subscriptionService.getBusinessData().subscribe(
            (businesses) => {
              this.businesses = businesses;
            }
        );

        /* Business Form Valiation Rules */
        this.addNewBusinessForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
            email: [ '', [] ],
            phone: [ '', [ Validators.required ] ],
            location: [ '', [ Validators.required ] ],
            business: [ '', [ Validators.required ] ],
            about: [ '', [ Validators.required ] ],
            depreciation: [ '', [] ]
        });

        /* Supplier Form Valiation Rules */
        this.addNewSupplierForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
            email: [ '', [ Validators.email ] ],
            phone: [ '', [ Validators.required ] ],
            location: [ '', [ Validators.required ] ],
            business: [ '', [ Validators.required ] ] /* What are they into */
        });

        /* Customer Form Valiation Rules */
        this.addNewCustomerForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
            email: [ '', [ Validators.email ] ],
            phone: [ '', [ Validators.required ] ],
            location: [ '', [ Validators.required ] ],
            business: [ '', [ Validators.required ] ] /* What are they into */
        });

        /* Raw Material Form Valiation Rules */
        this.addNewRawMaterialForm = this.fb.group({
            rawMaterial: [ '', [ Validators.required ] ],
            supplier: [ '', [ Validators.required ] ],
        });

        /* Work in Progress Form Valiation Rules */
        this.addNewWorkInProgressForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
        });

        /*Finished Goods Form Valiation Rules */
        this.addNewFinishedGoodsForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
        });

        /* Fixed Asset Form Valiation Rules */
        this.addNewFixedAssetForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
            lifeOfAsset: [ '', [ Validators.required ] ],
            cost: [ '', [ Validators.required ] ],
            seller: [ '', [ Validators.required ] ], /* seller of assets */
            sellersPhoneNumber: [ '', [ Validators.required ] ], /* seller of phone number */
            sellersLocation: [ '', [ Validators.required ] ] /* seller of location */
        });

        /* Factory Expenditure Form Valiation Rules */
        this.addNewFactoryExpenditureForm = this.fb.group({
            expenses: [ '', [ Validators.required ] ],
            amount: [ '', [ Validators.required ] ],
            description: [ '', [ Validators.required ] ],
        });

    }

    ngOnInit() {
        /* Get Business Data from Firebase */
        this.subscriptionService.getBusinessData().subscribe(
          (business) => {
            this.businesses = business;
            business.map(res => {
                this.businessName = res.businessName;
            });
          }
        );

        /* Get Subscription Data from Firebase */
        this.subscriptionService.getSubscriptionData().subscribe(
          (subscriptions) => {
            this.subscriptions = subscriptions;
          }
        );

        /* Get Supplier Data from Firebase */
        this.inventoryService.getSuppliers(this.uid, this.bid).subscribe(
            (suppliers) => {
              this.suppliers = suppliers;
            }
        );
        // this.alert();
    }

    /* Add Business */
    createBusinessModal(
        businessModalTitle: TemplateRef<{}>,
        businessModalContent: TemplateRef<{}>,
        businessModalFooter: TemplateRef<{}>
    ): void {
        this.businessModal = this.modalService.create({
          nzTitle: businessModalTitle,
          nzContent: businessModalContent,
          nzFooter: businessModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeBusinessModal(): void {
        this.businessModal.destroy();
    }

    processingNewBusiness(): void {
        this.businessModalButtonLoading = true;
        window.setTimeout(() => {
          this.businessModalButtonLoading = false;
          this.businessModal.destroy();
        }, 1000);
    }

    addNewBusiness = (value) => {
        console.log(value);
    }

    resetNewBusinessForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewBusinessForm.reset();
    }
    /* End */

    /* Add Suppliers */
    createSupplierModal(
        supplierModalTitle: TemplateRef<{}>,
        supplierModalContent: TemplateRef<{}>,
        supplierModalFooter: TemplateRef<{}>
    ): void {
        this.supplierModal = this.modalService.create({
          nzTitle: supplierModalTitle,
          nzContent: supplierModalContent,
          nzFooter: supplierModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeSupplierModal(): void {
        this.supplierModal.destroy();
    }

    processingNewSupplier(): void {
        this.supplierModalButtonLoading = true;
        window.setTimeout(() => {
        this.addNewSupplier(this.addNewSupplierForm.value);
          this.supplierModalButtonLoading = false;
          this.supplierModal.destroy();
        }, 1000);
    }

    addNewSupplier(supplier) {
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'name': supplier.name,
            'email': supplier.email,
            'phone': supplier.phone,
            'location': supplier.location,
            'business': supplier.business,
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.inventoryService.addSupplier(data);
            this.alertNotification('success', 'Add Supplier', `${data.name} has been recorded into the database. Thank you`);
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewSupplierForm.reset();
    }

    resetNewSupplierForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewSupplierForm.reset();
    }
    /* End */

    /* Add Customer */
    createCustomerModal(
        customerModalTitle: TemplateRef<{}>,
        customerModalContent: TemplateRef<{}>,
        customerModalFooter: TemplateRef<{}>
    ): void {
        this.customerModal = this.modalService.create({
          nzTitle: customerModalTitle,
          nzContent: customerModalContent,
          nzFooter: customerModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeCustomerModal(): void {
        this.customerModal.destroy();
    }

    processingNewCustomer(): void {
        this.customerModalButtonLoading = true;
        window.setTimeout(() => {
        this.addNewCustomer(this.addNewCustomerForm.value);
          this.customerModalButtonLoading = false;
          this.customerModal.destroy();
        }, 1000);
    }

    addNewCustomer(customer) {
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'name': customer.name,
            'email': customer.email,
            'phone': customer.phone,
            'location': customer.location,
            'business': customer.business,
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.customerService.addCustomer(data);
            this.alertNotification('success', 'Add Customer', `${data.name} has been recorded into the database. Thank you`);
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewCustomerForm.reset();
    }

    resetNewCustomerForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewCustomerForm.reset();
    }
    /* End Customer's Form */

    /* Add Raw Material */
    createRawMaterialModal(
        rawMaterialModalTitle: TemplateRef<{}>,
        rawMaterialModalContent: TemplateRef<{}>,
        rawMaterialModalFooter: TemplateRef<{}>
    ): void {
        this.rawMaterialModal = this.modalService.create({
          nzTitle: rawMaterialModalTitle,
          nzContent: rawMaterialModalContent,
          nzFooter: rawMaterialModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeRawMaterialModal(): void {
        this.rawMaterialModal.destroy();
    }

    processingNewRawMaterial(): void {
        this.rawMaterialModalButtonLoading = true;
        window.setTimeout(() => {
            this.addNewRawMaterial(this.addNewRawMaterialForm.value);
            this.rawMaterialModalButtonLoading = false;
            this.rawMaterialModal.destroy();
        }, 1000);
    }

    addNewRawMaterial(material) {
        const supplier = material.supplier.split('-', 3);
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'rawMaterial': material.rawMaterial,
            'supplier': {
                'id': supplier[0],
                'name': supplier[1],
                'phone': supplier[2]
            },
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.inventoryService.addRawMaterial(data);
            this.alertNotification('success', 'Add Raw Material', `${data.rawMaterial} has been recorded into the database. Thank you`);
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewRawMaterialForm.reset();
    }

    resetNewRawMaterialForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewRawMaterialForm.reset();
    }
    /* End Raw Material Form */

    /* Add Work in Progress */
    createWorkInProgressModal(
        workInProgressModalTitle: TemplateRef<{}>,
        workInProgressModalContent: TemplateRef<{}>,
        workInProgressModalFooter: TemplateRef<{}>
    ): void {
        this.workInProgressModal = this.modalService.create({
          nzTitle: workInProgressModalTitle,
          nzContent: workInProgressModalContent,
          nzFooter: workInProgressModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeWorkInProgressModal(): void {
        this.workInProgressModal.destroy();
    }

    processingNewWorkInProgress(): void {
        this.workInProgressModalButtonLoading = true;
        window.setTimeout(() => {
        this.addNewWorkInProgress(this.addNewWorkInProgressForm.value);
          this.workInProgressModalButtonLoading = false;
          this.workInProgressModal.destroy();
        }, 1000);
    }

    addNewWorkInProgress(wip) {
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'name': wip.name,
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.inventoryService.addWorkInProgress(data);
            this.alertNotification('success', 'Add Work in Progress', `${data.name} has been recorded into the database. Thank you`);
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewWorkInProgressForm.reset();
    }

    resetNewWorkInProgressForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewWorkInProgressForm.reset();
    }
    /* End */

    /* Add Finished Goods */
    createFinishedGoodsModal(
        finishedGoodsModalTitle: TemplateRef<{}>,
        finishedGoodsModalContent: TemplateRef<{}>,
        finishedGoodsModalFooter: TemplateRef<{}>
    ): void {
        this.finishedGoodsModal = this.modalService.create({
          nzTitle: finishedGoodsModalTitle,
          nzContent: finishedGoodsModalContent,
          nzFooter: finishedGoodsModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeFinishedGoodsModal(): void {
        this.finishedGoodsModal.destroy();
    }

    processingNewFinishedGoods(): void {
        this.finishedGoodsModalButtonLoading = true;
        window.setTimeout(() => {
        this.addNewFinishedGoods(this.addNewFinishedGoodsForm.value);
          this.finishedGoodsModalButtonLoading = false;
          this.finishedGoodsModal.destroy();
        }, 1000);
    }

    addNewFinishedGoods(goods) {
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'name': goods.name,
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.inventoryService.addFinishedGood(data);
            this.alertNotification('success', 'Add Work in Progress', `${data.name} has been recorded into the database. Thank you`);
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewFinishedGoodsForm.reset();
    }

    resetNewFinishedGoodsForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewFinishedGoodsForm.reset();
    }
    /* End */

    /* Add Factory Expenditure */
    createFactoryExpenditureModal(
        factoryExpenditureModalTitle: TemplateRef<{}>,
        factoryExpenditureModalContent: TemplateRef<{}>,
        factoryExpenditureModalFooter: TemplateRef<{}>
    ): void {
        this.factoryExpenditureModal = this.modalService.create({
          nzTitle: factoryExpenditureModalTitle,
          nzContent: factoryExpenditureModalContent,
          nzFooter: factoryExpenditureModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeFactoryExpenditureModal(): void {
        this.factoryExpenditureModal.destroy();
    }

    processingNewFactoryExpenditure(): void {
        this.factoryExpenditureModalButtonLoading = true;
        window.setTimeout(() => {
            this.addNewFactoryExpenditure(this.addNewFactoryExpenditureForm.value);
            this.factoryExpenditureModalButtonLoading = false;
            this.factoryExpenditureModal.destroy();
        }, 1000);
    }

    addNewFactoryExpenditure(expenditure) {
        const cost = expenditure.expenses.split('-', 2);
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'name': cost[0],
            'type': cost[1],
            'amount': expenditure.amount,
            'description': expenditure.description,
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.inventoryService.addFactoryExpenditure(data);
            this.alertNotification(
                'success',
                'Add Factory Expenditure', `${data.name} has been recorded into the database. Thank you`
            );
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewFactoryExpenditureForm.reset();
    }

    resetNewFactoryExpenditureForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewFactoryExpenditureForm.reset();
    }
    /* End Factory Overheads Form */

    /* Add Fixed Asset */
    createFixedAssetModal(
        fixedAssetModalTitle: TemplateRef<{}>,
        fixedAssetModalContent: TemplateRef<{}>,
        fixedAssetModalFooter: TemplateRef<{}>
    ): void {
        this.fixedAssetModal = this.modalService.create({
          nzTitle: fixedAssetModalTitle,
          nzContent: fixedAssetModalContent,
          nzFooter: fixedAssetModalFooter,
          nzMaskClosable: false,
          nzClosable: false,
          nzOnOk: () => console.log('Click ok')
        });
    }

    closeFixedAssetModal(): void {
        this.fixedAssetModal.destroy();
    }

    processingNewFixedAsset(): void {
        this.fixedAssetModalButtonLoading = true;
        window.setTimeout(() => {
            this.addNewFixedAsset(this.addNewFixedAssetForm.value);
            this.fixedAssetModalButtonLoading = false;
            this.fixedAssetModal.destroy();
        }, 1000);
    }

    addNewFixedAsset(asset) {
        const data = {
            'uid': this.bid,
            'bid': this.uid,
            'name': asset.name,
            'lifeOfAsset': asset.lifeOfAsset,
            'cost': asset.cost,
            'seller': asset.seller,
            'sellersPhoneNumber': asset.sellersPhoneNumber,
            'sellersLocation':  asset.sellersLocation,
            'created': new Date().getTime(),
            'updated': new Date().getTime(),
        };

        try {
            this.assetService.addFixedAsset(data);
            this.alertNotification('success', 'Add Fixed Asset', `${data.name} has been recorded into the database. Thank you`);
        } catch (error) {
            this.alertNotification('error', 'Error found', error);
        }

        this.addNewFixedAssetForm.reset();
    }

    resetNewFixedAssetForm(e: MouseEvent): void {
        e.preventDefault();
        this.addNewFixedAssetForm.reset();
    }
    /* End Fixed Asset Form */

    /* Sidebar Methods */
    eventCalled() {
        this.isActive = !this.isActive;
    }

    expandBusinessClass(element: any) {
        if (element === this.showBusinessMenu) {
            this.showBusinessMenu = '0';
        } else {
            this.showBusinessMenu = element;
        }
    }

    expandReportsClass(element: any) {
        if (element === this.showReportsMenu) {
            this.showReportsMenu = '0';
        } else {
            this.showReportsMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
    /* End */

    /* Alert Messages */
  alertNotification(type: string, title: string, content: string, options?: any): void {
    this.notify.config({
        nzTop: '60px'
    });
    this.notify.create(type, title, content);
  }
}
