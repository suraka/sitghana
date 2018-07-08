import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { Customer, RawMaterial, Supplier } from './../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  /* Customer Properties */
  public customer: Observable<Customer>;
  private customersCollection: AngularFirestoreCollection<Customer>;
  private customersDocument: AngularFirestoreDocument<Customer>;

  /* User / Business ID */
  private uid: string;
  private bid: string;

  constructor(
    private angularFireStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(
      (params) => {
      // Defaults to 0 if no query param provided.
      this.uid = decodeURI(params['id']);
      this.bid = decodeURI(params['bid']);
    });
  }

  /* Customer Methods | Add, Get some, Get one */
  public addCustomer(entries: {}) {
    const handler = this.angularFireStore.collection(`customers`);
    return handler.add(entries).then((ref) => {
      this.getCustomer(ref.id).update({'id': ref.id});
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getCustomers(): Observable<Customer[]> {
      this.customersCollection = this.angularFireStore.collection(
        'customers', (ref) => ref
        .orderBy('created', 'desc'),
      );
      return this.customersCollection.valueChanges();
  }

  public getCustomer(id: string) {
    return this.angularFireStore.doc<Customer>(`customers/${id}`);
  }
  /* End customer mthods */
}
