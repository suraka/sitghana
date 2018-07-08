import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Notification } from './../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  NotificationsCollection: AngularFirestoreCollection<Notification>;
  notifications: Observable<Notification[]>;
  NotificationsDoc: AngularFirestoreDocument<Notification>;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.NotificationsCollection = this.afs.collection(
      'notifications', (ref) => ref
      .orderBy('created', 'desc'),
    );

    this.notifications = this.NotificationsCollection.valueChanges();
  }

  getNotifications() {
    return this.notifications;
  }
}
