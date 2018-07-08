import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../../router.animations';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService, SubscriptionService, TransactionService } from './../../../core/services';
import { nature, Subscription, Business, Transaction } from './../../../core/models';

const now = new Date();

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss'],
  animations: [routerTransition()]
})
export class TrialBalanceComponent implements OnInit {

  public fromDate: NgbDateStruct;
  public toDate: NgbDateStruct;
  public date: { year: number, month: number };
  public businesses: Business[];
  public subscriptions: Subscription[];
  public transactions: Transaction[];

  constructor(
    public subscriptionService: SubscriptionService,
    private transactionServices: TransactionService,
    private route: ActivatedRoute,
    public router: Router
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

    /* Date Settings Parameters */
    this.toDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.fromDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1 - (this.toDate.month.valueOf() - 1 ),
      day: now.getDate() - (this.toDate.day.valueOf() - 1 )
    };

  }
}
