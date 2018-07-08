import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { FixedAsset } from './../models';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  /* Fixed Asset Properties */
  public fixedAssets: Observable<FixedAsset>;
  private fixedAssetsCollection: AngularFirestoreCollection<FixedAsset>;
  private fixedAssetsDocument: AngularFirestoreDocument<FixedAsset>;

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

  /* Fixed Asset Methods | Add, Get some, Get one */
  public addFixedAsset(entries: {}) {
    const handler = this.angularFireStore.collection(`fixed_assets`);
    return handler.add(entries).then((ref) => {
      this.getFixedAsset(ref.id).update({'id': ref.id});
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getFixedAssets(): Observable<FixedAsset[]> {
      this.fixedAssetsCollection = this.angularFireStore.collection(
        'fixed_assets', (ref) => ref
        .orderBy('created', 'desc'),
      );
      return this.fixedAssetsCollection.valueChanges();
  }

  public getFixedAsset(id: string) {
    return this.angularFireStore.doc<FixedAsset>(`fixed_assets/${id}`);
  }
  /* End fixed assets methods */

}
