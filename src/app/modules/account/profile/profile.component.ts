import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { routerTransition } from './../../../router.animations';

import { AuthService, SubscriptionService } from './../../../core/services';
import { nature, Subscription, Business } from './../../../core/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {

  public alerts: Array<any> = [];
  public business: Business[];
  public subscriptions: Subscription[];

  nature = nature;

  constructor(
    public authService: AuthService,
    public subscriptionService: SubscriptionService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscriptionService.getBusinessData().subscribe(
      (business) => {
        this.business = business;
      }
    );
    this.subscriptionService.getSubscriptionData().subscribe(
      (subscriptions) => {
        this.subscriptions = subscriptions;
      }
    );
    // this.alert();
  }

  /* private alert() {
    if (!this.subscriptions[0].confirm) {
      this.alerts.push(
        {
          id: 1,
          type: 'success',
          message: `Please make the pament to 0555980771 to complete the process. Your business will be setup shortly. Thank you!`
        }
      );
    }
  } */

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
