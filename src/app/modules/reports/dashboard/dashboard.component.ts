import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TransactionService, SubscriptionService, NotificationService } from './../../../core/services';

import { nature, Business, Subscription, Transaction, Notification } from './../../../core/models';
import { routerTransition } from './../../../router.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

  public businesses: Business[];
  public subscriptions: Subscription[];
  public transactions: Transaction[];
  public notifications: Notification[];
  public assets: any[];
  public liabilities: any[];
  public incomes: any[];
  public expenses: any[];
  public alerts: Array<any> = [];
  public nature = nature;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public subscriptionService: SubscriptionService,
    private transactionServices: TransactionService,
    private notificationServices: NotificationService) {
  }

  ngOnInit() {
    this.transactionServices.getByNature('assets').subscribe(
      (assets) => {
        this.assets = assets;
      }
    );
    this.transactionServices.getByNature('liabilities').subscribe(
      (assets) => {
        this.assets = assets;
      }
    );
    this.transactionServices.getByNature('incomes').subscribe(
      (assets) => {
        this.assets = assets;
      }
    );
    this.transactionServices.getByNature('expenses').subscribe(
      (assets) => {
        this.assets = assets;
      }
    );
    this.notificationServices.notifications.subscribe(msg => {
      this.notifications = msg;
    });
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
