import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

import { Transaction, File } from './../models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  adsCollection: AngularFirestoreCollection<Transaction>;
  searchResults: any;
  search: string;
  type: string;
  region: string;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute) { }

  searchAds(search: string/* , type: string, region: string */) {
    return this.router.navigate(['/search'], { queryParams: { s: search/* , t: type, r: region */ } });
  }

  /* getSnapshot(location: string): Observable<Transaction[]> {
    // Get search by condition
    if (location.includes('all') || location.includes('')) {
      this.adsCollection = this.afs.collection(
        'ads', (ref) => ref.where('public', '==', true));
    } else {
      this.adsCollection = this.afs.collection(
        'ads', (ref) => ref
        .where('region', '==', location)
        .where('public', '==', true));
    }

    return this.adsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Transaction;
        return {
          id: a.payload.doc.id,
          aid: a.payload.doc.id,
          title: data.title,
          content: data.content,
          type: data.type,
          price: data.price,
          category: data.category,
          filenames: data.filenames,
          url: data.url,
          views: data.views,
          region: data.region,
          town: data.town,
          escrow: data.escrow,
          phone: data.phone,
          uid: data.uid,
          time: data.time,
          expire: data.expire,
          updated: data.updated,
          public: data.public,
        };
      });
    });
  } */

  getCategorize(term: string) {
    this.adsCollection = this.afs.collection(
      'ads', (ref) => ref
      .where('category', '==', term)
      .where('public', '==', true));

    return this.adsCollection.valueChanges();
  }

}
