import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
// import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { Subscription, Business } from './../models';
import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  public bid = ''; // unique business id
  public business: Observable<any>;
  public currentSubscription: Observable<any>;
  private businessCollection: AngularFirestoreCollection<Business>;
  private subscriptionCollection: AngularFirestoreCollection<Subscription>;
  private angularFirestoreDocument: AngularFirestoreDocument<Business>;

  constructor(
    private authService: AuthService,
    private angularFireStore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router,
  ) {
    //// Get subscription(s) for a specific software user .where('uid', '==', this.uid)
    this.businessCollection = this.angularFireStore.collection(
      `businesses`, (ref) => ref
      .where('uid', '==', this.authService.uid$)
      .limit(1)
    );

    this.subscriptionCollection = this.angularFireStore.collection(
      `subscriptions`, (ref) => ref
      .where('uid', '==', this.authService.uid$)
      .where('expires', '>', 0)
      .limit(1)
    );
  }

  getBusinessData(): Observable<Business[]> {
    return this.businessCollection.valueChanges();
  }

  getSubscriptionData(): Observable<Subscription[]> {
    return this.subscriptionCollection.valueChanges();
  }

  public businessSetup(business: any, subscription: any) {
    const businessRef = this.angularFireStore.collection(`businesses`);
    business.uid = this.authService.uid$;
    return businessRef.add(business).then((ref) => {
      subscription.uid = this.authService.uid$;
      subscription.bid = ref.id;
      this.subscription(subscription);
      this.toastr.success(
        'Thank you for subscribing to our product!',
        'Subscription!',
        { timeOut: 10000 }
      );
    });
  }

  public subscription(data: any) {
    const businessRef = this.angularFireStore.collection(`subscriptions`);
    return businessRef.add(data).then((ref) => {
      this.router.navigate(['./../profile']);
    });
  }
}
