import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { Inventory, RawMaterial, FinishedGood, WorkInProgress, Supplier, FactoryExpenditure } from './../models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  /* Inventory Properties */
  public inventory: Observable<Inventory>;
  private inventoriesCollection: AngularFirestoreCollection<Inventory>;
  private inventoriesDocument: AngularFirestoreDocument<Inventory>;

  /* Raw Material Properties */
  public rawMaterial: Observable<RawMaterial>;
  private rawMaterialsCollection: AngularFirestoreCollection<RawMaterial>;
  private rawMaterialsDocument: AngularFirestoreDocument<RawMaterial>;

  /* Work In Progress Properties */
  public workInProgress: Observable<WorkInProgress>;
  private workInProgressCollection: AngularFirestoreCollection<WorkInProgress>;
  private workInProgressDocument: AngularFirestoreDocument<WorkInProgress>;

  /* Finished Goods Properties */
  public finishedGood: Observable<FinishedGood>;
  private finishedGoodsCollection: AngularFirestoreCollection<FinishedGood>;
  private finishedGoodsDocument: AngularFirestoreDocument<FinishedGood>;

  /* Supplier Properties */
  public suppliers: Observable<Supplier[]>;
  private suppliersCollection: AngularFirestoreCollection<Supplier>;
  private suppliersDocument: AngularFirestoreDocument<Supplier>;

  public factoryExpenditure: Observable<FactoryExpenditure[]>;
  private factoryExpenditureCollection: AngularFirestoreCollection<FactoryExpenditure>;
  private factoryExpenditureDocument: AngularFirestoreDocument<FactoryExpenditure>;

  /* User / Business ID */
  private uid: string;
  private bid: string;

  constructor(
    private readonly angularFireStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(
      (params) => {
        // Defaults to 0 if no query param provided.
        this.uid = decodeURI(params['id']);
        this.bid = decodeURI(params['bid']);
      });

    this.workInProgressCollection = this.angularFireStore.collection<WorkInProgress>('work_in_progress');
    this.finishedGoodsCollection = this.angularFireStore.collection<FinishedGood>('finished_goods');
    this.suppliersCollection = this.angularFireStore.collection<Supplier>('suppliers');
  }

  /* Inventory Methods | Add, Get some, Get one */
  public addInventory(entries: {}) {
    const handler = this.angularFireStore.collection(`inventories`);
    return handler.add(entries).then((ref) => {
      this.getInventory(ref.id).update({ 'id': ref.id });
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getCurrentInventories(): Observable<Inventory[]> {
    this.inventoriesCollection = this.angularFireStore.collection(
      'inventories', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.inventoriesCollection.valueChanges();
  }

  public getInventories(
    pageIndex: number = 1,
    pageSize: number = 10,
    sortField: string,
    sortOrder: string,
    type: string[]): Observable<Inventory[]> {
    this.inventoriesCollection = this.angularFireStore.collection(
      'inventories', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.inventoriesCollection.valueChanges();
  }

  public getInventory(id: string) {
    return this.angularFireStore.doc<Inventory>(`inventories/${id}`);
  }
  /* End inventory mthods */

  /* Audit Inventory Methods | Add, Get some, Get one */
  public auditInventory(entries: {}) {
    const handler = this.angularFireStore.collection(`audit_inventories`);
    return handler.add(entries).then((ref) => {
      this.getAuditInventory(ref.id).update({ 'id': ref.id });
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getAuditInventories(): Observable<Inventory[]> {
    this.inventoriesCollection = this.angularFireStore.collection(
      'audit_inventories', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.inventoriesCollection.valueChanges();
  }

  public getAuditInventory(id: string) {
    return this.angularFireStore.doc<Inventory>(`audit_inventories/${id}`);
  }
  /* End audit inventory mthods */

  /* Damage Inventory Methods | Add, Get some, Get one */
  public damageInventory(entries: {}) {
    const handler = this.angularFireStore.collection(`damage_inventories`);
    return handler.add(entries).then((ref) => {
      this.getDamageInventory(ref.id).update({ 'id': ref.id });
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getDamageInventories(): Observable<Inventory[]> {
    this.inventoriesCollection = this.angularFireStore.collection(
      'damage_inventories', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.inventoriesCollection.valueChanges();
  }

  public getDamageInventory(id: string) {
    return this.angularFireStore.doc<Inventory>(`damage_inventories/${id}`);
  }
  /* End damage inventory mthods */

  /* Raw Materials Methods | Add, Get some, Get one */
  public addRawMaterial(entries: {}) {
    const handler = this.angularFireStore.collection(`raw_materials`);
    return handler.add(entries).then((ref) => {
      this.getRawMaterial(ref.id).update({ 'id': ref.id });
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getRawMaterials(): Observable<RawMaterial[]> {
    this.rawMaterialsCollection = this.angularFireStore.collection(
      'raw_materials', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.rawMaterialsCollection.valueChanges();
  }

  public getRawMaterial(id: string) {
    return this.angularFireStore.doc(`raw_materials/${id}`);
  }
  /* End raw material methods */

  /* Finished Goods Methods | Add, Get some, Get one */
  public addFinishedGood(entries: {}) {
    const id = this.angularFireStore.createId();
    entries['id'] = id; // Persist a document id
    try {
      this.finishedGoodsCollection.doc(id).set(entries);
    } catch (error) {
      console.log('error', `Error found: ${error}`);
    }
  }

  public getFinishedGoods(): Observable<FinishedGood[]> {
    this.finishedGoodsCollection = this.angularFireStore.collection(
      'finished_goods', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.finishedGoodsCollection.valueChanges();
  }

  public getFinishedGood(id: string) {
    return this.angularFireStore.doc(`finished_goods/${id}`);
  }
  /* End finished goods methods */

  /* Work in Progress Methods | Add, Get some, Get one */
  public addWorkInProgress(entries: {}) {
    const id = this.angularFireStore.createId();
    entries['id'] = id; // Persist a document id
    try {
      this.workInProgressCollection.doc(id).set(entries);
    } catch (error) {
      console.log('error', `Error found: ${error}`);
    }
  }

  public getWorkInProgresses(): Observable<WorkInProgress[]> {
    this.workInProgressCollection = this.angularFireStore.collection(
      'work_in_progress', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.workInProgressCollection.valueChanges();
  }

  public getWorkInProgress(id: string) {
    return this.angularFireStore.doc(`work_in_progress/${id}`);
  }
  /* End work in progress methods */

  /* Factory Expenditure Methods | Add, Get some, Get one */
  public addFactoryExpenditure(entries: {}) {
    const handler = this.angularFireStore.collection(`factory_expenditure`);
    return handler.add(entries).then((ref) => {
      this.getFactoryExpenditure(ref.id).update({ 'id': ref.id });
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  }

  public getCarriageOnRawMaterials(): Observable<FactoryExpenditure[]> {
    this.factoryExpenditureCollection = this.angularFireStore.collection(
      'factory_expenditure', (ref) => ref
        .where('type', '==', 'carriage')
        .orderBy('created', 'desc'),
    );
    return this.factoryExpenditureCollection.valueChanges();
  }

  public getIndirectFactoryExpenditures(): Observable<FactoryExpenditure[]> {
    this.factoryExpenditureCollection = this.angularFireStore.collection(
      'factory_expenditure', (ref) => ref
        .where('type', '==', 'indirect')
        .orderBy('created', 'desc'),
    );
    return this.factoryExpenditureCollection.valueChanges();
  }

  public getDirectFactoryExpenditures(): Observable<FactoryExpenditure[]> {
    this.factoryExpenditureCollection = this.angularFireStore.collection(
      'factory_expenditure', (ref) => ref
        .where('type', '==', 'direct')
        .orderBy('created', 'desc'),
    );
    return this.factoryExpenditureCollection.valueChanges();
  }

  public getFactoryExpenditure(id: string) {
    return this.angularFireStore.doc(`factory_expenditure/${id}`);
  }
  /* End factory overheads methods */

  /* Suppliers Methods | Add, Get some, Get one */
  /* public addSupplier(entries: any) {
    const handler = this.angularFireStore.collection(`suppliers`);
    return handler.add(entries).then((ref) => {
      this.getSupplier(ref.id).update({'id': ref.id});
    }).catch((error) => {
      console.log('error', `Error found: ${error}`);
    });
  } */
  public addSupplier(entries: {}) {
    const id = this.angularFireStore.createId();
    entries['id'] = id; // Persist a document id
    this.suppliersCollection.doc(id).set(entries);
  }

  public getSuppliers(uid: string, bid: string): Observable<Supplier[]> {
    this.suppliersCollection = this.angularFireStore.collection<Supplier>(
      'suppliers', (ref) => ref
        .orderBy('created', 'desc'),
    );
    return this.suppliersCollection.valueChanges();
  }

  public getSupplier(id: string) {
    return this.angularFireStore.doc<Supplier>(`suppliers/${id}`);
  }
  /* End suppliers methods */

  /* Carriage on Raw Materials */
  public getCarriage(): Observable<FactoryExpenditure[]> {
    this.factoryExpenditureCollection = this.angularFireStore.collection(
      'factory_expenditure', (ref) => ref
        .where('type', '==', 'carriage')
        .orderBy('created', 'desc'),
    );
    return this.factoryExpenditureCollection.valueChanges();
  }
}
