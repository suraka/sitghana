import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../../router.animations';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService, SubscriptionService, TransactionService, InventoryService } from './../../../core/services';
import { nature, Subscription, Business, Transaction, Inventory, RawMaterial } from './../../../core/models';

const now = new Date();

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.scss'],
  animations: [routerTransition()]
})
export class ManufacturingComponent implements OnInit {

  public fromDate: NgbDateStruct;
  public toDate: NgbDateStruct;
  public date: { year: number, month: number };
  public businesses: Business[];
  public subscriptions: Subscription[];
  public transactions: Transaction[];

  /*  */
  public directCost: any;
  public totalDirectCost: number;
  public totalIndirectCost: number;
  public indirectCost: any;
  public purchaseAmount: number;
  public carriage: number;
  public openingInventory: number;
  public closingInventory: number;

  constructor(
    public subscriptionService: SubscriptionService,
    private transactionServices: TransactionService,
    private route: ActivatedRoute,
    public router: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    /* Get Business Data */
    this.subscriptionService.getBusinessData().subscribe(
      (businesses) => {
        this.businesses = businesses;
      }
    );

    /* Get Business Subcription Information */
    this.subscriptionService.getSubscriptionData().subscribe(
      (subscriptions) => {
        this.subscriptions = subscriptions;
      }
    );

    /* Get All Transactions of a Business */
    this.transactionServices.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });

    /* Get Purchase of Raw Materials Data */
    this.inventoryService.getCurrentInventories().subscribe(
      (response) => {
        this.purchaseAmount = 0;
        response.forEach(element => {
          this.purchaseAmount += (element.quantity * element.price);
        });
      }
    );

    /* Get Carriage of Raw Materials Data */
    this.inventoryService.getCarriageOnRawMaterials().subscribe(
      (response) => {
        response.map((res) => this.carriage = res.amount);
      }
    );

    /* Get Closing Inventories of Raw Materials Data */
    this.inventoryService.getAuditInventories().subscribe(
      (response) => {
        this.closingInventory = 0;
        response.forEach(element => {
          this.closingInventory += (element.quantity * element.price);
        });
      }
    );

    /* Get Direct Factory Expenditure Data */
    this.inventoryService.getDirectFactoryExpenditures().subscribe(
      (response) => {
        this.directCost = response;
        this.totalDirectCost = 0;
        response.forEach(element => {
          this.totalDirectCost += (element.amount);
        });
      }
    );

    /* Get Indirect Factory Expenditure Data */
    this.inventoryService.getIndirectFactoryExpenditures().subscribe(
      (response) => {
        this.indirectCost = response;
        this.totalIndirectCost = 0;
        response.forEach(element => {
          this.totalIndirectCost += (element.amount);
        });
      }
    );

    /* Date Settings Parameters */
    this.toDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.fromDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1 - (this.toDate.month.valueOf() - 1 ),
      day: now.getDate() - (this.toDate.day.valueOf() - 1 )
    };

  }

}
